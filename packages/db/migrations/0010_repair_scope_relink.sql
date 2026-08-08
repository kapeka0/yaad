-- Repair active exact-scope ownership for legacy assets that are still
-- unlinked. Existing ownership is left untouched. As with wildcard scopes, an
-- exact hostname is assigned only if every active match belongs to one program;
-- duplicate scopes inside that program resolve to the newest row, then its id.
WITH exact_scopes AS (
  SELECT
    id AS scope_id,
    program_id,
    created_at,
    lower(asset) AS domain
  FROM scopes
  WHERE NOT wildcard
    AND in_scope
),
unambiguous_exact AS (
  SELECT domain
  FROM exact_scopes
  GROUP BY domain
  HAVING count(DISTINCT program_id) = 1
),
ranked_exact AS (
  SELECT
    es.domain,
    es.scope_id,
    row_number() OVER (
      PARTITION BY es.domain
      ORDER BY es.created_at DESC, es.scope_id DESC
    ) AS preference
  FROM exact_scopes AS es
  JOIN unambiguous_exact AS ue USING (domain)
),
latest_exact_scope AS (
  SELECT domain, scope_id
  FROM ranked_exact
  WHERE preference = 1
)
UPDATE assets AS a
SET scope_id = s.scope_id
FROM latest_exact_scope AS s
WHERE a.scope_id IS NULL
  AND lower(a.domain) = s.domain;

-- Repair the wildcard portion of the historical relink. Avoid regex escaping
-- here: substring reliably removes the literal "*." prefix, while the CASE
-- also supports rows that are marked wildcard without storing that prefix.
--
-- A host is assigned only at its most-specific matching wildcard boundary and
-- only when every scope at that boundary belongs to one program. If duplicate
-- scopes exist for that program, the newest scope (then greatest id) is chosen.
-- Ambiguous, inactive, malformed, and already-linked assets remain unchanged.
WITH wildcard_scopes AS (
  SELECT
    id AS scope_id,
    program_id,
    created_at,
    lower(
      CASE
        WHEN asset LIKE '*.%' THEN substring(asset FROM 3)
        ELSE asset
      END
    ) AS base
  FROM scopes
  WHERE wildcard
    AND in_scope
),
suffixes AS (
  SELECT
    a.id AS asset_id,
    array_to_string(
      (string_to_array(lower(a.domain), '.'))[
        i:array_length(string_to_array(a.domain, '.'), 1)
      ],
      '.'
    ) AS base
  FROM assets AS a
  CROSS JOIN LATERAL generate_series(
    1,
    array_length(string_to_array(a.domain, '.'), 1)
  ) AS i
  WHERE a.scope_id IS NULL
    AND a.domain NOT LIKE '%/%'
    AND a.domain NOT LIKE '% %'
),
matches AS (
  SELECT
    sf.asset_id,
    ws.scope_id,
    ws.program_id,
    ws.created_at,
    length(ws.base) AS specificity
  FROM suffixes AS sf
  JOIN wildcard_scopes AS ws ON ws.base = sf.base
),
best AS (
  SELECT asset_id, max(specificity) AS specificity
  FROM matches
  GROUP BY asset_id
),
unambiguous AS (
  SELECT m.asset_id
  FROM matches AS m
  JOIN best AS b USING (asset_id, specificity)
  GROUP BY m.asset_id
  HAVING count(DISTINCT m.program_id) = 1
),
ranked AS (
  SELECT
    m.asset_id,
    m.scope_id,
    row_number() OVER (
      PARTITION BY m.asset_id
      ORDER BY m.created_at DESC, m.scope_id DESC
    ) AS preference
  FROM matches AS m
  JOIN best AS b USING (asset_id, specificity)
  JOIN unambiguous AS u USING (asset_id)
),
safe AS (
  SELECT asset_id, scope_id
  FROM ranked
  WHERE preference = 1
)
UPDATE assets AS a
SET scope_id = s.scope_id
FROM safe AS s
WHERE a.id = s.asset_id
  AND a.scope_id IS NULL;

-- Older installations can lack column statistics because sha256 was added
-- after most javascript_files rows were written. Refresh them once so future
-- grep and maintenance plans estimate indexed hash lookups correctly.
ANALYZE javascript_files (sha256);

-- Make exact in-scope roots deterministic: the most recently imported exact
-- scope owns the asset. This repairs roots that predated scope association and
-- keeps re-imports consistent with the application upserts.
WITH latest_exact_scope AS (
  SELECT DISTINCT ON (lower(asset))
    lower(asset) AS domain,
    id AS scope_id
  FROM scopes
  WHERE NOT wildcard AND in_scope
  ORDER BY lower(asset), created_at DESC, id DESC
)
UPDATE assets AS a
SET scope_id = s.scope_id
FROM latest_exact_scope AS s
WHERE lower(a.domain) = s.domain
  AND a.scope_id IS DISTINCT FROM s.scope_id;

-- Recover unscoped discoveries under wildcard roots without an O(assets ×
-- scopes) suffix join. Only the most-specific unambiguous program is used.
WITH wildcard_scopes AS (
  SELECT
    id AS scope_id,
    program_id,
    lower(regexp_replace(asset, '^\\*\\.', '')) AS base
  FROM scopes
  WHERE wildcard AND in_scope
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
    length(ws.base) AS specificity
  FROM suffixes AS sf
  JOIN wildcard_scopes AS ws ON ws.base = sf.base
),
best AS (
  SELECT asset_id, max(specificity) AS specificity
  FROM matches
  GROUP BY asset_id
),
safe AS (
  SELECT m.asset_id, max(m.scope_id) AS scope_id
  FROM matches AS m
  JOIN best AS b USING (asset_id, specificity)
  GROUP BY m.asset_id
  HAVING count(DISTINCT m.program_id) = 1
)
UPDATE assets AS a
SET scope_id = s.scope_id
FROM safe AS s
WHERE a.id = s.asset_id
  AND a.scope_id IS NULL;

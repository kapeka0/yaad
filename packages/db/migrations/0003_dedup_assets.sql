-- Delete duplicate assets keeping the oldest (lowest id) per domain
DELETE FROM assets
WHERE id NOT IN (
  SELECT MIN(id) FROM assets GROUP BY domain
);

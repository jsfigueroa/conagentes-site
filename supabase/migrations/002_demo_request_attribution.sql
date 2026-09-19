-- CON-292 — tie a demo request back to the browsing that produced it.
--
-- `demo_requests` is owned by this repo (see 001), so its columns live here
-- even though the reporting surface is in the app. The companion table
-- `site_events` is created by the app repo's migration 00176.
--
-- Without these two columns the only way to connect a submission to the pages
-- that led to it is to guess from a timestamp, which fails the moment more
-- than one person is on the site.

ALTER TABLE demo_requests
  ADD COLUMN IF NOT EXISTS visitor_id  TEXT,
  ADD COLUMN IF NOT EXISTS attribution JSONB;

COMMENT ON COLUMN demo_requests.visitor_id IS
  'CON-292 — cga_vid of the submitting browser; joins this row to site_events.visitor_id.';
COMMENT ON COLUMN demo_requests.attribution IS
  'CON-292 — {first_touch, last_touch} attribution snapshot captured at submit time.';

CREATE INDEX IF NOT EXISTS idx_demo_requests_visitor
  ON demo_requests (visitor_id)
  WHERE visitor_id IS NOT NULL;

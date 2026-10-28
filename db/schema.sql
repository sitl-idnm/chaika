-- PostgreSQL schema for the site's own DB (replaces Supabase since 28.10.2026).
-- One row (id = 1) holds the admin override JSON, deep-merged over
-- src/shared/content/defaults.ts. Connection: DATABASE_URL in .env.local.
--
--   sudo -u postgres psql -c "CREATE ROLE chaika LOGIN PASSWORD '...'"
--   sudo -u postgres psql -c "CREATE DATABASE chaika OWNER chaika"
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS site_content (
  id         integer PRIMARY KEY,
  data       jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

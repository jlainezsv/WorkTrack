CREATE TABLE IF NOT EXISTS "clients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "contact_name" text,
  "email" text,
  "phone" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "clients_name_idx" ON "clients" ("name");
CREATE INDEX IF NOT EXISTS "clients_email_idx" ON "clients" ("email");

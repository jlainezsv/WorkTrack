ALTER TABLE "time_entries"
ADD COLUMN IF NOT EXISTS "paid_at" date;

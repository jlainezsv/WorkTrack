ALTER TABLE "employees" ADD COLUMN "employee_code" text NOT NULL;--> statement-breakpoint
CREATE INDEX "employees_employee_code_idx" ON "employees" USING btree ("employee_code");--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_employee_code_unique" UNIQUE("employee_code");
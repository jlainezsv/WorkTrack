import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  date,
  index,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/*
  Employees Table
*/
export const employees = pgTable(
  "employees",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    employeeCode: text("employee_code").notNull().unique(),
    name: text("name").notNull(),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      activeIdx: index("employees_active_idx").on(table.active),
      employeeCodeIdx: index("employees_employee_code_idx").on(table.employeeCode),
    };
  }
);

/*
  Clients Table
*/
export const clients = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    contactName: text("contact_name"),
    email: text("email"),
    phone: text("phone"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      nameIdx: index("clients_name_idx").on(table.name),
      emailIdx: index("clients_email_idx").on(table.email),
    };
  }
);

/*
  Time Entries Table
*/
export const timeEntries = pgTable(
  "time_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    employeeId: uuid("employee_id")
      .notNull()
      .references(() => employees.id, {
        onDelete: "restrict",
      }),

    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }).notNull(),

    clientName: text("client_name").notNull(),
    description: text("description"),

    status: text("status").notNull().default("unpaid"),
    paidAt: date("paid_at"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      employeeIdx: index("time_entries_employee_idx").on(table.employeeId),
      startTimeIdx: index("time_entries_start_time_idx").on(table.startTime),
      endAfterStartCheck: check(
        "end_time_after_start_check",
        sql`${table.endTime} > ${table.startTime}`
      ),
    };
  }
);
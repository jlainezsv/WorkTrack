import { db } from "../client"
import { timeEntries } from "../schema"

import { TimeEntry } from "../../../domain/entities/TimeEntry"
import { TimeEntryRepository } from "../../../application/repositories/TimeEntryRepository"

import { eq, and, lte, gte } from "drizzle-orm"

/*
────────────────────────────────────────────────────────
Repository Implementation — Drizzle ORM
────────────────────────────────────────────────────────

This class implements the TimeEntryRepository interface
using Drizzle ORM to persist and retrieve data from
PostgreSQL.

Layer: Infrastructure

Responsibilities:
• Translate domain entities → database rows
• Execute SQL queries through Drizzle
• Map database rows → domain entities
*/

export class DrizzleTimeEntryRepository implements TimeEntryRepository {

  /*
  ─────────────────────────────────────────
  COMMANDS (write operations)
  ─────────────────────────────────────────
  */

  /*
  Save a TimeEntry.

  If the entry already exists (same id),
  it updates the record instead of inserting.
  */
  async save(entry: TimeEntry): Promise<void> {

    await db
      .insert(timeEntries)
      .values({
        id: entry.id,
        employeeId: entry.employeeId,
        startTime: entry.startTime,
        endTime: entry.endTime,
        clientName: entry.clientName,
        description: entry.description,
        status: entry.status,
        createdAt: entry.createdAt
      })
      .onConflictDoUpdate({
        target: timeEntries.id,
        set: {
          startTime: entry.startTime,
          endTime: entry.endTime,
          clientName: entry.clientName,
          description: entry.description,
          status: entry.status
        },
      })
  }

  /*
  Update an existing TimeEntry.
  */
  async update(entry: TimeEntry): Promise<void> {

    await db
      .update(timeEntries)
      .set({
        startTime: entry.startTime,
        endTime: entry.endTime,
        clientName: entry.clientName,
        description: entry.description,
        status: entry.status
      })
      .where(eq(timeEntries.id, entry.id))
  }


  /*
  ─────────────────────────────────────────
  QUERIES (read operations)
  ─────────────────────────────────────────
  */

  /*
  Find a TimeEntry by its unique ID.
  */
  async findById(id: string): Promise<TimeEntry | null> {

    const rows = await db
      .select()
      .from(timeEntries)
      .where(eq(timeEntries.id, id))

    if (rows.length === 0) {
      return null
    }

    return this.toDomain(rows[0])
  }

  /*
  Find all TimeEntries for a specific employee.

  Optional filters:
  • from → start date
  • to → end date
  */
  async findByEmployeeId(
    employeeId: string,
    options?: { from?: Date; to?: Date }
  ): Promise<TimeEntry[]> {

    const conditions = [eq(timeEntries.employeeId, employeeId)]

    if (options?.from) {
      conditions.push(gte(timeEntries.startTime, options.from))
    }

    if (options?.to) {
      conditions.push(lte(timeEntries.endTime, options.to))
    }

    const rows = await db
      .select()
      .from(timeEntries)
      .where(and(...conditions))

    return rows.map(this.toDomain)
  }

  /*
  Find entries that overlap with a given time range.

  Used to prevent overlapping time entries.
  */
  async findOverlapping(
    employeeId: string,
    start: Date,
    end: Date
  ): Promise<TimeEntry[]> {

    const rows = await db
      .select()
      .from(timeEntries)
      .where(
        and(
          eq(timeEntries.employeeId, employeeId),
          lte(timeEntries.startTime, end),
          gte(timeEntries.endTime, start)
        )
      )

    return rows.map(this.toDomain)
  }

  /*
  Retrieve all TimeEntries in the system.
  */
  async findAll(): Promise<TimeEntry[]> {

    const rows = await db
      .select()
      .from(timeEntries)

    return rows.map(this.toDomain)
  }


  /*
  ─────────────────────────────────────────
  MAPPING
  ─────────────────────────────────────────

  Convert a database row into a domain entity.
  */

  private toDomain(row: typeof timeEntries.$inferSelect): TimeEntry {

    return new TimeEntry({
      id: row.id,
      employeeId: row.employeeId,
      startTime: row.startTime,
      endTime: row.endTime,
      clientName: row.clientName,
      description: row.description,
      status: row.status as "paid" | "unpaid",
      createdAt: row.createdAt
    })
  }

}
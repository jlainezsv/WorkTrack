import { TimeEntry } from "@domain/entities/TimeEntry"
import type { TimeEntryRepository } from "@application/repositories/TimeEntryRepository"

const STORAGE_KEY = "worktrack_time_entries"

export class LocalStorageTimeEntryRepository implements TimeEntryRepository {

  private load(): TimeEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)

    return parsed.map((item: any) =>
      new TimeEntry(
        item.id,
        item.employeeId,
        new Date(item.start),
        new Date(item.end),
        item.clientName,
        item.description,
        item.status
      )
    )
  }

  private saveAll(entries: TimeEntry[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }

  async findAll(): Promise<TimeEntry[]> {
    return this.load()
  }

  async findByEmployeeId(employeeId: string): Promise<TimeEntry[]> {
    const entries = this.load()
    return entries.filter(e => e.employeeId === employeeId)
  }

  async save(entry: TimeEntry): Promise<void> {
    const entries = this.load()
    entries.push(entry)
    this.saveAll(entries)
  }

  async update(entry: TimeEntry): Promise<void> {
    const entries = this.load()

    const index = entries.findIndex(e => e.id === entry.id)
    if (index === -1) return

    entries[index] = entry

    this.saveAll(entries)
  }
}

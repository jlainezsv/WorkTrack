import type { TimeEntryRepository } from "@application/repositories/TimeEntryRepository"
import { TimeEntry } from "@domain/entities/TimeEntry"

export class InMemoryTimeEntryRepository implements TimeEntryRepository {
    private entries: TimeEntry[] = []

    async findByEmployeeId(employeeId: string): Promise<TimeEntry[]> {
        return this.entries.filter(entry => entry.employeeId === employeeId)
    }

    async save(entry: TimeEntry): Promise<void> {
        this.entries.push(entry)
    }

    async findAll(): Promise<TimeEntry[]> {
        return this.entries
    }
}
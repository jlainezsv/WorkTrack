import { TimeEntry } from "@domain/entities/TimeEntry"
import type { TimeEntryRepository } from "@application/repositories/TimeEntryRepository"
import type { EmployeeRepository } from "@application/repositories/EmployeeRepository"
export interface RegisterTimeEntryInput {
  id: string
  employeeId: string
  startTime: Date
  endTime: Date
  clientName?: string
  description?: string
}
export class RegisterTimeEntry {
    constructor(
        private timeEntryRepository: TimeEntryRepository,
        private employeeRepository: EmployeeRepository
    ) {}

    async execute(input: RegisterTimeEntryInput): Promise<void> {
        const employee = await this.employeeRepository.findById(input.employeeId)

        if (!employee) {
        throw new Error("Employee does not exist")
        }
        const newEntry = new TimeEntry(
            input.id,
            input.employeeId,
            input.startTime,
            input.endTime,
            input.clientName,
            input.description
        )

        const existingEntries = await this.timeEntryRepository.findByEmployeeId(
            input.employeeId
        )

        const hasOverlap = existingEntries.some(entry =>
            newEntry.overlapsWith(entry)
        )

        if (hasOverlap) {
            throw new Error("Time entry overlaps with an existing entry")
        }

        await this.timeEntryRepository.save(newEntry)
    }
}
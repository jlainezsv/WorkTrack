import { TimeEntry } from "@domain/entities/TimeEntry"
import type { TimeEntryRepository } from "@application/repositories/TimeEntryRepository"
import type { EmployeeRepository } from "@application/repositories/EmployeeRepository"

interface GetEmployeeHoursResult {
  employeeName: string
  entries: TimeEntry[]
  totalHours: number
  paidHours: number
  unpaidHours: number
}

export class GetEmployeeHours {
  constructor(
    private timeEntryRepository: TimeEntryRepository,
    private employeeRepository: EmployeeRepository
  ) {}

  async execute(employeeId: string): Promise<GetEmployeeHoursResult> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      return {
        employeeName: "Unknown",
        entries: [],
        totalHours: 0,
        paidHours: 0,
        unpaidHours: 0
      }
    }

    // Get time entries for that employee
    const entries = await this.timeEntryRepository.findByEmployeeId(employeeId)

    // Aggregate
    let totalHours = 0
    let paidHours = 0
    let unpaidHours = 0

    for (const entry of entries) {
      const hours = entry.getDurationInHours()
      totalHours += hours

      if (entry.status === "paid") {
        paidHours += hours
      } else {
        unpaidHours += hours
      }
    }

    // Return DTO
    return {
      employeeName: employee.name,
      entries,
      totalHours,
      paidHours,
      unpaidHours
    }
  }
}
import type { TimeEntryRepository } from "@application/repositories/TimeEntryRepository"
import type { EmployeeRepository } from "@application/repositories/EmployeeRepository"

interface DashboardSummaryItem {
  employeeId: string
  employeeName: string
  totalHours: number
}

export class GetDashboardSummary {
  constructor(
    private timeEntryRepository: TimeEntryRepository,
    private employeeRepository: EmployeeRepository
  ) {}

  async execute(): Promise<DashboardSummaryItem[]> {
    const entries = await this.timeEntryRepository.findAll()

    const summaryMap: Record<string, number> = {}

    // gregación
    for (const entry of entries) {
      const hours = entry.getDurationInHours()

      if (!summaryMap[entry.employeeId]) {
        summaryMap[entry.employeeId] = 0
      }

      summaryMap[entry.employeeId] += hours
    }

    const result: DashboardSummaryItem[] = []

    // Join
    for (const employeeId of Object.keys(summaryMap)) {
      const employee = await this.employeeRepository.findById(employeeId)

      result.push({
        employeeId,
        employeeName: employee ? employee.name : "Unknown",
        totalHours: summaryMap[employeeId]
      })
    }

    return result
  }
}
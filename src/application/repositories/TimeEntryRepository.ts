import { TimeEntry } from "@/domain/entities/TimeEntry"

export interface TimeEntryRepository {

  findByEmployeeId(employeeId: string): Promise<TimeEntry[]>

  findAll(): Promise<TimeEntry[]>

  save(entry: TimeEntry): Promise<void>

  update(entry: TimeEntry): Promise<void>

  updateStatus(id: string, status: "paid" | "unpaid", paidAt?: string): Promise<void>

}
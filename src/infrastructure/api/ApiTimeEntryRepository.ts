import type { TimeEntryRepository } from "@/application/repositories/TimeEntryRepository"
import { TimeEntry } from "@/domain/entities/TimeEntry"

import { ApiClient } from "./ApiClient"
import type { TimeEntryDTO } from "./dto/TimeEntryDTO"
import { TimeEntryMapper } from "./mappers/TimeEntryMapper"

const apiClient = new ApiClient()

export class ApiTimeEntryRepository implements TimeEntryRepository {

  async findByEmployeeId(employeeId: string): Promise<TimeEntry[]> {
    const dtos = await apiClient.get<TimeEntryDTO[]>(`/employees/${employeeId}/time-entries`)
    return dtos.map(TimeEntryMapper.toDomain)
  }

  async findAll(): Promise<TimeEntry[]> {
    const dtos = await apiClient.get<TimeEntryDTO[]>("/employees/time-entries/all")
    return dtos.map(TimeEntryMapper.toDomain)
  }

  async save(entry: TimeEntry): Promise<void> {
    const dto = TimeEntryMapper.toDTO(entry)

    await apiClient.post(
      `/employees/${entry.employeeId}/time-entries`,
      dto
    )
  }

  async update(entry: TimeEntry): Promise<void> {
    const dto = TimeEntryMapper.toDTO(entry)

    await apiClient.patch(
      `/time-entries/${entry.id}`,
      dto
    )
  }

  private apiClient = new ApiClient();

  async updateStatus(id: string, status: "paid" | "unpaid", paidAt?: string): Promise<void> {
    await this.apiClient.patch(`/employees/time-entries/${id}/status`, {
      status,
      paidAt,
    });
  }

}
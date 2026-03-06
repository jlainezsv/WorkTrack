import { TimeEntry } from "@/domain/entities/TimeEntry"
import type { TimeEntryDTO } from "../dto/TimeEntryDTO"

export class TimeEntryMapper {

  static toDomain(dto: TimeEntryDTO): TimeEntry {
    return new TimeEntry(
      dto.id,
      dto.employeeId,
      new Date(dto.startTime),
      new Date(dto.endTime),
      dto.clientName,
      dto.description,
      dto.status,
      dto.createdAt ? new Date(dto.createdAt) : new Date(),
    )
  }

  static toDTO(entry: TimeEntry): TimeEntryDTO {
    return {
      id: entry.id,
      employeeId: entry.employeeId,
      startTime: entry.startTime.toISOString(),
      endTime: entry.endTime.toISOString(),
      clientName: entry.clientName,
      description: entry.description,
      createdAt: entry.createdAt.toISOString(),
      status: entry.status
    }
  }

}
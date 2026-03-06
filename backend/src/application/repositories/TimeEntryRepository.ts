import { TimeEntry } from "../../domain/entities/TimeEntry";

export interface TimeEntryRepository {
  save(entry: TimeEntry): Promise<void>;

  update(entry: TimeEntry): Promise<void>;

  findById(id: string): Promise<TimeEntry | null>;

  findByEmployeeId(
    employeeId: string,
    options?: {
      from?: Date;
      to?: Date;
    }
  ): Promise<TimeEntry[]>;

  findOverlapping(
    employeeId: string,
    start: Date,
    end: Date
  ): Promise<TimeEntry[]>;

  findAll(): Promise<TimeEntry[]>;
}
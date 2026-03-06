import { randomUUID } from "crypto";
import { TimeEntry } from "../../domain/entities/TimeEntry";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { TimeEntryRepository } from "../repositories/TimeEntryRepository";
import { TimeEntryOverlapError } from "../errors/TimeEntryOverlapError";
import { EmployeeNotFoundError } from "../errors/EmployeeNotFoundError";
import { EmployeeInactiveError } from "../errors/EmployeeInactiveError";

interface RegisterTimeEntryInput {
  employeeId: string;
  startTime: Date;
  endTime: Date;
  clientName: string;
  description?: string | null;
}

export class RegisterTimeEntry {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly timeEntryRepository: TimeEntryRepository
  ) {}

  async execute(input: RegisterTimeEntryInput): Promise<TimeEntry> {
    const employee = await this.employeeRepository.findById(
      input.employeeId
    );

    if (!employee) {
      throw new EmployeeNotFoundError();
    }

    if (!employee.active) {
      throw new EmployeeInactiveError();
    }

    const newEntry = new TimeEntry({
      id: randomUUID(),
      employeeId: input.employeeId,
      startTime: input.startTime,
      endTime: input.endTime,
      clientName: input.clientName,
      description: input.description ?? null,
      status: "unpaid",
      createdAt: new Date()
    })

    const overlapping = await this.timeEntryRepository.findOverlapping(
      input.employeeId,
      input.startTime,
      input.endTime
    );

    if (overlapping.length > 0) {
      throw new TimeEntryOverlapError();
    }

    await this.timeEntryRepository.save(newEntry);

    return newEntry;
  }
}
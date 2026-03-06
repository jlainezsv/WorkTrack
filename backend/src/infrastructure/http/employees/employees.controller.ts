import {Controller, Get, Post, Patch, Body, Param, Query, Inject, HttpException, HttpStatus,} from "@nestjs/common";

/* Use Cases */
import { GetEmployees } from "../../../application/use-cases/GetEmployees";
import { CreateEmployee } from "../../../application/use-cases/CreateEmployee";
import { RegisterTimeEntry } from "../../../application/use-cases/RegisterTimeEntry";
import { UpdateTimeEntryStatus } from "../../../application/use-cases/UpdateTimeEntryStatus";

/* Repositories */
import { EmployeeRepository } from "../../../application/repositories/EmployeeRepository";
import { TimeEntryRepository } from "../../../application/repositories/TimeEntryRepository";

/* Domain */
import { Employee } from "../../../domain/entities/Employee";
import { TimeEntry } from "../../../domain/entities/TimeEntry";

/* DTOs */
import { EmployeeResponseDto } from "./dto/employee.response.dto";
import { TimeEntryResponseDto } from "./dto/time-entry.response.dto";

@Controller("employees")
export class EmployeesController {

  private readonly getEmployees: GetEmployees;
  private readonly createEmployee: CreateEmployee;
  private readonly registerTimeEntry: RegisterTimeEntry;

  constructor(
    @Inject("EmployeeRepository")
    private readonly employeeRepository: EmployeeRepository,

    @Inject("TimeEntryRepository")
    private readonly timeEntryRepository: TimeEntryRepository,

    private readonly updateTimeEntryStatusUseCase: UpdateTimeEntryStatus,
  ) {
    this.getEmployees = new GetEmployees(this.employeeRepository);

    this.createEmployee = new CreateEmployee(
      this.employeeRepository
    );

    this.registerTimeEntry = new RegisterTimeEntry(
      this.employeeRepository,
      this.timeEntryRepository
    );
  }

  /*
  ─────────────────────────────────────────
  EMPLOYEE ROUTES
  ─────────────────────────────────────────
  */

  @Get()
  async getAll(
    @Query("includeInactive") includeInactive?: string
  ): Promise<EmployeeResponseDto[]> {

    const employees = await this.getEmployees.execute({
      includeInactive: includeInactive === "true",
    });

    return employees.map(this.toResponseDto);
  }

  @Get(":id")
  async findById(
    @Param("id") id: string
  ): Promise<EmployeeResponseDto> {

    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new HttpException(
        "Employee not found",
        HttpStatus.NOT_FOUND
      );
    }

    return this.toResponseDto(employee);
  }

  @Post()
  async create(
    @Body() body: { name: string; photoUrl?: string }
  ): Promise<EmployeeResponseDto> {

    const employee = await this.createEmployee.execute({
      name: body.name,
      photoUrl: body.photoUrl,
    });

    return this.toResponseDto(employee);
  }

  /*
  ─────────────────────────────────────────
  TIME ENTRY ROUTES
  ─────────────────────────────────────────
  */

  @Get(":id/time-entries")
  async getTimeEntriesByEmployee(
    @Param("id") id: string
  ): Promise<TimeEntryResponseDto[]> {

    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new HttpException(
        "Employee not found",
        HttpStatus.NOT_FOUND
      );
    }

    const entries = await this.timeEntryRepository.findByEmployeeId(id);

    return entries.map((entry) =>
      this.toTimeEntryResponseDto(entry)
    );
  }

  @Post(":id/time-entries")
  async registerTime(
    @Param("id") id: string,
    @Body() body: any
  ) {
    return this.registerTimeEntry.execute({
      employeeId: id,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      clientName: body.clientName,
      description: body.description,
    });
  }

  @Patch("time-entries/:id/status")
  async updateTimeEntryStatus(
    @Param("id") id: string,
    @Body() body: { status: "paid" | "unpaid" }
  ) {
    return this.updateTimeEntryStatusUseCase.execute(
      id,
      body.status
    );
  }

  /*
  ─────────────────────────────────────────
  DTO MAPPERS
  ─────────────────────────────────────────
  */

  private toResponseDto(
    employee: Employee
  ): EmployeeResponseDto {

    return {
      id: employee.id,
      employeeCode: employee.employeeCode,
      name: employee.name,
      active: employee.active,
      createdAt: employee.createdAt.toISOString(),
    };
  }

  private toTimeEntryResponseDto(
    entry: TimeEntry
  ): TimeEntryResponseDto {

    return {
      id: entry.id,
      employeeId: entry.employeeId,
      startTime: entry.startTime.toISOString(),
      endTime: entry.endTime.toISOString(),
      clientName: entry.clientName ?? undefined,
      description: entry.description ?? undefined,
      status: entry.status,
      createdAt: entry.createdAt.toISOString(),
    };
  }
}
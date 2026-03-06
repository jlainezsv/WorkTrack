import { Employee } from "../../domain/entities/Employee";
import { EmployeeRepository } from "../repositories/EmployeeRepository";

export class GetEmployees {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(options?: { includeInactive?: boolean }): Promise<Employee[]> {
    const includeInactive = options?.includeInactive ?? false;

    return this.employeeRepository.findAll(includeInactive);
  }
}
import { randomUUID } from "crypto";
import { Employee } from "../../domain/entities/Employee";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { EmployeeCodeGenerator } from "../services/EmployeeCodeGenerator";

interface CreateEmployeeInput {
  name: string;
  photoUrl?: string;
}

export class CreateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: CreateEmployeeInput): Promise<Employee> {
    const generator = new EmployeeCodeGenerator(this.employeeRepository);

    const employeeCode = await generator.generateNextCode("EMP");

    const employee = new Employee(
      randomUUID(),
      employeeCode,
      input.name,
      true,
      new Date(),
      input.photoUrl
    );

    await this.employeeRepository.save(employee);

    return employee;
  }
}
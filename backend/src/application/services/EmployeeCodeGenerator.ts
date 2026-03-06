import { EmployeeRepository } from "../repositories/EmployeeRepository";

export class EmployeeCodeGenerator {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async generateNextCode(prefix: string = "EMP"): Promise<string> {
    const latestCode = await this.employeeRepository.findLatestEmployeeCode();

    if (!latestCode) {
      return `${prefix}-001`;
    }

    const numericPart = parseInt(latestCode.split("-").pop() || "0", 10);
    const nextNumber = numericPart + 1;

    const padded = String(nextNumber).padStart(3, "0");

    return `${prefix}-${padded}`;
  }
}
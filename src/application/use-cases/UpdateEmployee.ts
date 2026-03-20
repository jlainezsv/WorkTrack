import type { EmployeeRepository } from "../repositories/EmployeeRepository"
import type { EmployeeStatus } from "@domain/entities/Employee"

interface UpdateEmployeeInput {
  id: string
  name?: string
  photoUrl?: string
  status?: EmployeeStatus
}

export class UpdateEmployee {
  constructor(private readonly repo: EmployeeRepository) {}

  async execute(input: UpdateEmployeeInput): Promise<void> {
    const employee = await this.repo.findById(input.id)
    if (!employee) throw new Error("Employee not found")

    if (input.name) employee.name = input.name
    if (input.photoUrl !== undefined) employee.photoUrl = input.photoUrl
    if (input.status !== undefined) employee.status = input.status

    await this.repo.update(employee)
  }
}
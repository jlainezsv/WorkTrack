import { EmployeeRepository } from "../repositories/EmployeeRepository"

interface UpdateEmployeeInput {
  id: string
  name?: string
  photoUrl?: string
  status?: "active" | "inactive"
}

export class UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: UpdateEmployeeInput): Promise<void> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) throw new Error("Employee not found")

    if (input.name) employee.name = input.name
    if (input.photoUrl !== undefined) employee.photoUrl = input.photoUrl
    if (input.status !== undefined) employee.active = input.status === "active"
    await this.employeeRepository.update(employee)
  }
}
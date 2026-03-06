import type { EmployeeRepository } from "@application/repositories/EmployeeRepository"

export interface CreateEmployeeInput {
  name: string
  photoUrl?: string
}

export class CreateEmployee {
  constructor(private repository: EmployeeRepository) {}

  async execute(input: CreateEmployeeInput): Promise<void> {
    await this.repository.save({
      name: input.name
    } as any)
  }
}
import { Employee } from "@domain/entities/Employee"

export interface EmployeeRepository {
  findAll(includeInactive?: boolean): Promise<Employee[]>
  findById(id: string): Promise<Employee | null>
  save(employee: Employee): Promise<void>
  update(employee: Employee): Promise<void>
}
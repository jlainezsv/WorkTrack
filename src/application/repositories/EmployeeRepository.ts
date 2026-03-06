import { Employee } from "@domain/entities/Employee"

export interface EmployeeRepository {
  findAll(): Promise<Employee[]>
  findById(id: string): Promise<Employee | null>
  save(employee: Employee): Promise<void>
}
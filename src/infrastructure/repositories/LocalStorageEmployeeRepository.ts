import { Employee } from "@domain/entities/Employee"
import type { EmployeeRepository } from "@application/repositories/EmployeeRepository"

const STORAGE_KEY = "worktrack_employees"

export class LocalStorageEmployeeRepository implements EmployeeRepository {

  private load(): Employee[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)

    return parsed.map((item: any) =>
      new Employee(
        item.id,
        item.name,
        item.status
      )
    )
  }

  private saveAll(employees: Employee[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
  }

  async findAll(): Promise<Employee[]> {
    return this.load()
  }

  async findById(id: string): Promise<Employee | null> {
    const employees = this.load()
    return employees.find(e => e.id === id) || null
  }

  async save(employee: Employee): Promise<void> {
    const employees = this.load()
    employees.push(employee)
    this.saveAll(employees)
  }
}
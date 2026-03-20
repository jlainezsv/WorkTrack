import type { EmployeeRepository } from "@/application/repositories/EmployeeRepository"
import { Employee } from "@/domain/entities/Employee"

import { ApiClient } from "./ApiClient"
import type { EmployeeDTO } from "./dto/EmployeeDTO"
import { EmployeeMapper } from "./mappers/EmployeeMapper"

const apiClient = new ApiClient()

export class ApiEmployeeRepository implements EmployeeRepository {

  async findAll(includeInactive = false): Promise<Employee[]> {
    const query = includeInactive ? "?includeInactive=true" : ""
    const dtos = await apiClient.get<EmployeeDTO[]>(`/employees${query}`)
    return dtos.map(EmployeeMapper.toDomain)
  }

  async findById(id: string): Promise<Employee | null> {
    try {
      const dto = await apiClient.get<EmployeeDTO>(`/employees/${id}`)
      return EmployeeMapper.toDomain(dto)
    } catch {
      return null
    }
  }

  async save(employee: Employee): Promise<void> {
    await apiClient.post("/employees", {
      name: employee.name,
      photoUrl: employee.photoUrl
    })
  }
  async update(employee: Employee): Promise<void> {
    await apiClient.patch(`/employees/${employee.id}`, {
      name: employee.name,
      photoUrl: employee.photoUrl,
      status: employee.status,
    })
  }

}
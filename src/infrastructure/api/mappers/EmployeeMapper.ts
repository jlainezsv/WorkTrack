import { Employee } from "@/domain/entities/Employee"
import type { EmployeeDTO } from "../dto/EmployeeDTO"

export class EmployeeMapper {

  static toDomain(dto: EmployeeDTO): Employee {
    return new Employee(
      dto.id,
      dto.employeeCode,
      dto.name,
      dto.status,
      new Date(dto.createdAt),
      dto.photoUrl
    )
  }

}
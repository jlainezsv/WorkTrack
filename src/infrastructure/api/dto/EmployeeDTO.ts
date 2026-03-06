export interface EmployeeDTO {
  id: string
  employeeCode: string
  name: string
  status: "active" | "inactive"
  createdAt: string
  photoUrl?: string
}
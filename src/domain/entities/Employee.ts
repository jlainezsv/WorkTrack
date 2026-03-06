export type EmployeeStatus = "active" | "inactive"
export class Employee {
  constructor(
    public readonly id: string,
    public readonly employeeCode: string,
    public name: string,
    public status: EmployeeStatus = "active",
    public readonly createdAt: Date = new Date(),
    public photoUrl?: string
  ) {
    if (!id) throw new Error("Employee id is required")
    if (!employeeCode) throw new Error("Employee code is required")
    if (!name) throw new Error("Employee name is required")
  }
}
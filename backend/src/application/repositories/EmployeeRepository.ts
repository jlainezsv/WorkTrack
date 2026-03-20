import { Employee } from "../../domain/entities/Employee";

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;

  findById(id: string): Promise<Employee | null>;

  findLatestEmployeeCode(): Promise<string | null>;

  findAll(includeInactive?: boolean): Promise<Employee[]>;

  existsById(id: string): Promise<boolean>;

  updateStatus(id: string): Promise<void>;

  update(employee: Employee): Promise<void>;
}
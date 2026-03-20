import { db } from "../client";
import { employees } from "../schema";
import { Employee } from "../../../domain/entities/Employee";
import { EmployeeRepository } from "../../../application/repositories/EmployeeRepository";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";

export class DrizzleEmployeeRepository implements EmployeeRepository {
  async save(employee: Employee): Promise<void> {
    await db
      .insert(employees)
      .values({
        id: employee.id,
        employeeCode: employee.employeeCode,
        name: employee.name,
        active: employee.active,
        createdAt: employee.createdAt,
      })
      .onConflictDoUpdate({
        target: employees.id,
        set: {
          name: employee.name,
          active: employee.active,
          employeeCode: employee.employeeCode,
        },
      });
  }

  async findById(id: string): Promise<Employee | null> {
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));

    if (result.length === 0) return null;

    const row = result[0];

    return new Employee(
      row.id,
      row.employeeCode,
      row.name,
      row.active,
      row.createdAt
    );
  }

  async findAll(includeInactive = false): Promise<Employee[]> {
    const rows = await db
      .select()
      .from(employees)
      .where(includeInactive ? undefined : eq(employees.active, true));

    return rows.map(
      (row) =>
        new Employee(
          row.id,
          row.employeeCode,
          row.name,
          row.active,
          row.createdAt
        )
    );
  }

  async findLatestEmployeeCode(): Promise<string | null> {
    const result = await db
      .select({ employeeCode: employees.employeeCode })
      .from(employees)
      .orderBy(desc(employees.employeeCode))
      .limit(1);

    return result.length ? result[0].employeeCode : null;
  }

  async existsById(id: string): Promise<boolean> {
    const result = await db
      .select({ id: employees.id })
      .from(employees)
      .where(eq(employees.id, id));

    return result.length > 0;
  }

  async update(employee: Employee): Promise<void> {
    await db
      .update(employees)
      .set({ name: employee.name, active: employee.active })
      .where(eq(employees.id, employee.id));
  }

  async updateStatus(id: string): Promise<void> {
    await db
      .update(employees)
      .set({ active: false })
      .where(eq(employees.id, id));
  }
}
export class Employee {
  constructor(
    public readonly id: string,
    public readonly employeeCode: string,
    public name: string,
    public active: boolean,
    public readonly createdAt: Date,
    public photoUrl?: string
  ) {}

  deactivate(): void {
    if (!this.active) {
      throw new Error("Employee is already inactive");
    }

    this.active = false;
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error("Employee name cannot be empty");
    }

    this.name = newName;
  }
}
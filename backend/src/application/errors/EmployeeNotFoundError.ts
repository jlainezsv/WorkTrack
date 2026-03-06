import { ApplicationError } from "./ApplicationError";

export class EmployeeNotFoundError extends ApplicationError {
  constructor() {
    super("Employee does not exist.");
  }

  getStatusCode(): number {
    return 404;
  }
}
import { ApplicationError } from "./ApplicationError";

export class EmployeeInactiveError extends ApplicationError {
  constructor() {
    super("Cannot register time entry for inactive employee.");
  }

  getStatusCode(): number {
    return 400;
  }
}
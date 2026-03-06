import { ApplicationError } from "./ApplicationError";

export class TimeEntryOverlapError extends ApplicationError {
  constructor() {
    super("Time entry overlaps with an existing entry.");
  }

  getStatusCode(): number {
    return 409;
  }
}
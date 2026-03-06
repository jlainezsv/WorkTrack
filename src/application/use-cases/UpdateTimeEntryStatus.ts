import type { TimeEntryRepository } from "@/application/repositories/TimeEntryRepository"

export class UpdateTimeEntryStatus {

  constructor(
    private readonly repository: TimeEntryRepository
  ) {}

  async execute(id: string, status: "paid" | "unpaid") {
    await this.repository.updateStatus(id, status)
  }

}
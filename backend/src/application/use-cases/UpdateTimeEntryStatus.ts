import { Inject, Injectable } from "@nestjs/common"
import type { TimeEntryRepository } from "../repositories/TimeEntryRepository"

@Injectable()
export class UpdateTimeEntryStatus {

  constructor(
    @Inject("TimeEntryRepository")
    private readonly timeEntryRepository: TimeEntryRepository
  ) {}

  async execute(id: string, status: "paid" | "unpaid") {

    const entry = await this.timeEntryRepository.findById(id)

    if (!entry) {
      throw new Error("Time entry not found")
    }

    entry.status = status

    await this.timeEntryRepository.update(entry)

    return entry
  }

}
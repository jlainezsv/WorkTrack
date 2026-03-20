import { Inject, Injectable } from "@nestjs/common"
import type { TimeEntryRepository } from "../repositories/TimeEntryRepository"

@Injectable()
export class UpdateTimeEntryStatus {

  constructor(
    @Inject("TimeEntryRepository")
    private readonly timeEntryRepository: TimeEntryRepository
  ) {}

  async execute(id: string, status: "paid" | "unpaid", paidAt?: string) {

    const entry = await this.timeEntryRepository.findById(id)

    if (!entry) {
      throw new Error("Time entry not found")
    }

    if (status === "paid") {
      const selectedDate = paidAt ?? new Date().toISOString().split("T")[0]
      const today = new Date().toISOString().split("T")[0]

      if (selectedDate > today) {
        throw new Error("Paid date cannot be in the future")
      }

      if (entry.status === "paid") {
        entry.paidAt = selectedDate
      } else {
        entry.markAsPaid(selectedDate)
      }
    } else {
      entry.markAsUnpaid()
    }

    await this.timeEntryRepository.update(entry)

    return entry
  }

}
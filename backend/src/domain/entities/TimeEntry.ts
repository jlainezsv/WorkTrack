interface TimeEntryProps {
  id: string
  employeeId: string
  startTime: Date
  endTime: Date
  clientName: string
  description: string | null
  status: "paid" | "unpaid"
  paidAt?: string | null
  createdAt: Date
}

export class TimeEntry {
  public readonly id: string
  public readonly employeeId: string
  public startTime: Date
  public endTime: Date
  public clientName: string
  public description: string | null
  public status: "paid" | "unpaid"
  public paidAt: string | null
  public readonly createdAt: Date

  constructor(props: TimeEntryProps) {
    this.id = props.id
    this.employeeId = props.employeeId
    this.startTime = props.startTime
    this.endTime = props.endTime
    this.clientName = props.clientName
    this.description = props.description
    this.status = props.status
    this.paidAt = props.paidAt ?? null
    this.createdAt = props.createdAt

    this.validateTime()
  }

  private validateTime(): void {
    if (this.endTime <= this.startTime) {
      throw new Error("End time must be after start time")
    }
  }

  markAsPaid(paidAt?: string): void {
    if (this.status === "paid") {
      throw new Error("Time entry is already paid")
    }
    this.status = "paid"
    this.paidAt = paidAt ?? new Date().toISOString().split("T")[0]
  }

  markAsUnpaid(): void {
    this.status = "unpaid"
    this.paidAt = null
  }

  updateTime(start: Date, end: Date): void {
    this.startTime = start
    this.endTime = end
    this.validateTime()
  }
}
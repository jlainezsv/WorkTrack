interface TimeEntryProps {
  id: string
  employeeId: string
  startTime: Date
  endTime: Date
  clientName: string
  description: string | null
  status: "paid" | "unpaid"
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
  public readonly createdAt: Date

  constructor(props: TimeEntryProps) {
    this.id = props.id
    this.employeeId = props.employeeId
    this.startTime = props.startTime
    this.endTime = props.endTime
    this.clientName = props.clientName
    this.description = props.description
    this.status = props.status
    this.createdAt = props.createdAt

    this.validateTime()
  }

  private validateTime(): void {
    if (this.endTime <= this.startTime) {
      throw new Error("End time must be after start time")
    }
  }

  markAsPaid(): void {
    if (this.status === "paid") {
      throw new Error("Time entry is already paid")
    }
    this.status = "paid"
  }

  updateTime(start: Date, end: Date): void {
    this.startTime = start
    this.endTime = end
    this.validateTime()
  }
}
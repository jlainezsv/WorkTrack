export type PaymentStatus = "paid" | "unpaid"

export class TimeEntry {
  public status: PaymentStatus
  public paidAt?: string

  constructor(
    public readonly id: string,
    public readonly employeeId: string,
    public readonly startTime: Date,
    public readonly endTime: Date,
    public readonly clientName?: string,
    public readonly description?: string,
    status: PaymentStatus = "unpaid",
    public readonly createdAt: Date = new Date(),
    paidAt?: string,
    
  ) {
    this.status = status
    this.paidAt = paidAt
    this.validate()
  }

  private validate(): void {
    if (this.endTime < this.startTime) {
      throw new Error("End time must be after start time")
    }
  }

  public getDurationInHours(): number {
    const diffInMs = this.endTime.getTime() - this.startTime.getTime()
    return diffInMs / (1000 * 60 * 60)
  }

  public overlapsWith(other: TimeEntry): boolean {
    return this.startTime < other.endTime && this.endTime > other.startTime
  }

  public markAsPaid(): void {
    this.status = "paid"
    this.paidAt = new Date().toISOString().split("T")[0]
  }

  public markAsUnpaid(): void {
    this.status = "unpaid"
    this.paidAt = undefined
  }
}
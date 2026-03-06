export interface TimeEntryResponseDto {
  id: string
  employeeId: string
  startTime: string
  endTime: string
  clientName?: string
  description?: string
  status: "paid" | "unpaid"
  createdAt: string
}
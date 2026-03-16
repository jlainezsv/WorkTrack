import { db } from "@/infrastructure/db/worktrackDB"

export async function saveTimeEntryOffline(employeeId: string) {
  await db.timeEntries.add({
    employeeId,
    start: new Date().toISOString(),
    synced: false
  })
}
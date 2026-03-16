import { db } from "@/infrastructure/db/worktrackDB"

interface ApiTimeEntry {
  employeeId: string
  start: string
  end?: string
}

export async function syncPendingEntries(
  apiCreateTimeEntry: (entry: ApiTimeEntry) => Promise<void>
) {
  try {
    const pendingEntries = await db.timeEntries
      .filter((entry) => entry.synced === false)
      .toArray()

    for (const entry of pendingEntries) {
      await apiCreateTimeEntry({
        employeeId: entry.employeeId,
        start: entry.start,
        end: entry.end
      })

      if (entry.id !== undefined) {
        await db.timeEntries.update(entry.id, {
          synced: true
        })
      }
    }
  } catch (error) {
    console.error("Sync failed:", error)
  }
}
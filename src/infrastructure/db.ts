import Dexie from "dexie"

export const db = new Dexie("worktrack")

db.version(1).stores({
  timeEntries: "++id, employeeId, start, end, synced"
})
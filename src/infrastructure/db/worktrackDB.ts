import Dexie from "dexie"
import type { Table } from "dexie"

export interface LocalTimeEntry {
  id?: number
  employeeId: string
  start: string
  end?: string
  synced: boolean
}

class WorkTrackDB extends Dexie {
  timeEntries!: Table<LocalTimeEntry>

  constructor() {
    super("worktrack")

    this.version(1).stores({
      timeEntries: "++id, employeeId, start, end, synced"
    })
  }
}

export const db = new WorkTrackDB()
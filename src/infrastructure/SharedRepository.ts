import { ApiTimeEntryRepository } from "./api/ApiTimeEntryRepository"
import { UpdateTimeEntryStatus } from "@application/use-cases/UpdateTimeEntryStatus"
import { ApiEmployeeRepository } from "./api/ApiEmployeeRepository"



export const sharedEmployeeRepository = new ApiEmployeeRepository()

export const sharedTimeEntryRepository = new ApiTimeEntryRepository()
export const updateTimeEntryStatus = new UpdateTimeEntryStatus(sharedTimeEntryRepository)
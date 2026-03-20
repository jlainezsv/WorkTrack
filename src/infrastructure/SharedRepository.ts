import { ApiTimeEntryRepository } from "./api/ApiTimeEntryRepository"
import { UpdateTimeEntryStatus } from "@application/use-cases/UpdateTimeEntryStatus"
import { ApiEmployeeRepository } from "./api/ApiEmployeeRepository"
import { UpdateEmployee } from "@application/use-cases/UpdateEmployee"
import { ApiClientRepository } from "./api/ApiClientRepository"
import { UpdateClient } from "@application/use-cases/UpdateClient"

export const sharedEmployeeRepository = new ApiEmployeeRepository()
export const sharedClientRepository = new ApiClientRepository()

export const sharedTimeEntryRepository = new ApiTimeEntryRepository()
export const updateTimeEntryStatus = new UpdateTimeEntryStatus(sharedTimeEntryRepository)
export const updateEmployee = new UpdateEmployee(sharedEmployeeRepository)
export const updateClient = new UpdateClient(sharedClientRepository)
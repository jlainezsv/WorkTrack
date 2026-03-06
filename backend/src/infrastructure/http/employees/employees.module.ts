import { Module } from "@nestjs/common";
import { EmployeesController } from "./employees.controller";

import { DrizzleEmployeeRepository } from "../../database/repositories/DrizzleEmployeeRepository";
import { DrizzleTimeEntryRepository } from "../../database/repositories/DrizzleTimeEntryRepository";

import { UpdateTimeEntryStatus } from "../../../application/use-cases/UpdateTimeEntryStatus";

@Module({
  controllers: [EmployeesController],

  providers: [
    {
      provide: "EmployeeRepository",
      useClass: DrizzleEmployeeRepository,
    },
    {
      provide: "TimeEntryRepository",
      useClass: DrizzleTimeEntryRepository,
    },

    UpdateTimeEntryStatus,
  ],

  exports: ["EmployeeRepository", "TimeEntryRepository"],
})
export class EmployeesModule {}
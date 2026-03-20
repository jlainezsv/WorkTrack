import { Module } from "@nestjs/common";
import { EmployeesModule } from "./employees/employees.module";
import { ClientsModule } from "./clients/clients.module";

@Module({
  imports: [EmployeesModule, ClientsModule],
})
export class AppModule {}
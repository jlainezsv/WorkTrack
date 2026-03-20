import { Module } from "@nestjs/common";

import { DrizzleClientRepository } from "../../database/repositories/DrizzleClientRepository";
import { ClientsController } from "./clients.controller";

@Module({
  controllers: [ClientsController],
  providers: [
    {
      provide: "ClientRepository",
      useClass: DrizzleClientRepository,
    },
  ],
  exports: ["ClientRepository"],
})
export class ClientsModule {}

import type { ClientRepository } from "@application/repositories/ClientRepository"
import { Client } from "@domain/entities/Client"

export class GetClients {
  constructor(private readonly repository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.repository.findAll()
  }
}

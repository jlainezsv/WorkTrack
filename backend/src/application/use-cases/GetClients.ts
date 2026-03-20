import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../repositories/ClientRepository";

export class GetClients {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}

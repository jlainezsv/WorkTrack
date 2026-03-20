import { randomUUID } from "crypto";

import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../repositories/ClientRepository";

interface CreateClientInput {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

export class CreateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(input: CreateClientInput): Promise<Client> {
    const client = new Client(
      randomUUID(),
      input.name,
      new Date(),
      input.contactName,
      input.email,
      input.phone
    );

    await this.clientRepository.save(client);

    return client;
  }
}

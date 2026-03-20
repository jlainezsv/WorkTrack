import { Client } from "@domain/entities/Client"
import type { ClientRepository } from "@application/repositories/ClientRepository"

interface CreateClientInput {
  name: string
  contactName?: string
  email?: string
  phone?: string
}

export class CreateClient {
  constructor(private readonly repository: ClientRepository) {}

  async execute(input: CreateClientInput): Promise<void> {
    const client = new Client(
      crypto.randomUUID(),
      input.name,
      new Date(),
      input.contactName,
      input.email,
      input.phone
    )

    await this.repository.save(client)
  }
}

import type { ClientRepository } from "@application/repositories/ClientRepository"

interface UpdateClientInput {
  id: string
  name?: string
  contactName?: string
  email?: string
  phone?: string
}

export class UpdateClient {
  constructor(private readonly repository: ClientRepository) {}

  async execute(input: UpdateClientInput): Promise<void> {
    const client = await this.repository.findById(input.id)
    if (!client) throw new Error("Client not found")

    if (input.name !== undefined) client.name = input.name
    if (input.contactName !== undefined) client.contactName = input.contactName
    if (input.email !== undefined) client.email = input.email
    if (input.phone !== undefined) client.phone = input.phone

    await this.repository.update(client)
  }
}

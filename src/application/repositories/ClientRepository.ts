import { Client } from "@domain/entities/Client"

export interface ClientRepository {
  findAll(): Promise<Client[]>
  findById(id: string): Promise<Client | null>
  save(client: Client): Promise<void>
  update(client: Client): Promise<void>
}

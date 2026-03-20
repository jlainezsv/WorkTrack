import type { ClientRepository } from "@application/repositories/ClientRepository"
import { Client } from "@domain/entities/Client"

import { ApiClient } from "./ApiClient"
import type { ClientDTO } from "./dto/ClientDTO"
import { ClientMapper } from "./mappers/ClientMapper"

const apiClient = new ApiClient()

export class ApiClientRepository implements ClientRepository {
  async findAll(): Promise<Client[]> {
    const dtos = await apiClient.get<ClientDTO[]>("/clients")
    return dtos.map(ClientMapper.toDomain)
  }

  async findById(id: string): Promise<Client | null> {
    try {
      const dto = await apiClient.get<ClientDTO>(`/clients/${id}`)
      return ClientMapper.toDomain(dto)
    } catch {
      return null
    }
  }

  async save(client: Client): Promise<void> {
    await apiClient.post("/clients", {
      name: client.name,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
    })
  }

  async update(client: Client): Promise<void> {
    await apiClient.patch(`/clients/${client.id}`, {
      name: client.name,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
    })
  }
}

import { Client } from "@domain/entities/Client"
import type { ClientDTO } from "../dto/ClientDTO"

export class ClientMapper {
  static toDomain(dto: ClientDTO): Client {
    return new Client(
      dto.id,
      dto.name,
      new Date(dto.createdAt),
      dto.contactName,
      dto.email,
      dto.phone
    )
  }
}

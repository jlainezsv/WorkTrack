import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { ClientRepository } from "../../../application/repositories/ClientRepository";
import { CreateClient } from "../../../application/use-cases/CreateClient";
import { GetClients } from "../../../application/use-cases/GetClients";
import { UpdateClient } from "../../../application/use-cases/UpdateClient";
import { Client } from "../../../domain/entities/Client";
import { ClientResponseDto } from "./dto/client.response.dto";

@Controller("clients")
export class ClientsController {
  private readonly createClient: CreateClient;
  private readonly getClients: GetClients;
  private readonly updateClient: UpdateClient;

  constructor(
    @Inject("ClientRepository")
    private readonly clientRepository: ClientRepository
  ) {
    this.createClient = new CreateClient(this.clientRepository);
    this.getClients = new GetClients(this.clientRepository);
    this.updateClient = new UpdateClient(this.clientRepository);
  }

  @Get()
  async getAll(): Promise<ClientResponseDto[]> {
    const clients = await this.getClients.execute();
    return clients.map(this.toResponseDto);
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }
    return this.toResponseDto(client);
  }

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      contactName?: string;
      email?: string;
      phone?: string;
    }
  ): Promise<ClientResponseDto> {
    const client = await this.createClient.execute(body);
    return this.toResponseDto(client);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body()
    body: {
      name?: string;
      contactName?: string;
      email?: string;
      phone?: string;
    }
  ): Promise<ClientResponseDto> {
    await this.updateClient.execute({ id, ...body });

    const updated = await this.clientRepository.findById(id);
    if (!updated) {
      throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }

    return this.toResponseDto(updated);
  }

  private toResponseDto = (client: Client): ClientResponseDto => {
    return {
      id: client.id,
      name: client.name,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt.toISOString(),
    };
  };
}

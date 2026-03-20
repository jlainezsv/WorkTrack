import { asc, eq } from "drizzle-orm";

import { ClientRepository } from "../../../application/repositories/ClientRepository";
import { Client } from "../../../domain/entities/Client";
import { db } from "../client";
import { clients } from "../schema";

export class DrizzleClientRepository implements ClientRepository {
  async findAll(): Promise<Client[]> {
    const rows = await db.select().from(clients).orderBy(asc(clients.name));

    return rows.map(
      (row) =>
        new Client(
          row.id,
          row.name,
          row.createdAt,
          row.contactName ?? undefined,
          row.email ?? undefined,
          row.phone ?? undefined
        )
    );
  }

  async findById(id: string): Promise<Client | null> {
    const rows = await db.select().from(clients).where(eq(clients.id, id));

    if (!rows.length) return null;

    const row = rows[0];

    return new Client(
      row.id,
      row.name,
      row.createdAt,
      row.contactName ?? undefined,
      row.email ?? undefined,
      row.phone ?? undefined
    );
  }

  async save(client: Client): Promise<void> {
    await db.insert(clients).values({
      id: client.id,
      name: client.name,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
    });
  }

  async update(client: Client): Promise<void> {
    await db
      .update(clients)
      .set({
        name: client.name,
        contactName: client.contactName,
        email: client.email,
        phone: client.phone,
      })
      .where(eq(clients.id, client.id));
  }
}

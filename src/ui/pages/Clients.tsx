import { useEffect, useState } from "react"

import { GetClients } from "@application/use-cases/GetClients"
import { Client } from "@domain/entities/Client"
import { sharedClientRepository, updateClient } from "@infrastructure/SharedRepository"

import { AppLayout } from "@/ui/components/AppLayout"
import { ClientsDesktop } from "@/ui/components/client/ClientsDesktop"
import { ClientsMobile } from "@/ui/components/client/ClientsMobile"

import { CreateClientDialog } from "./CreateClientDialog"

const getClients = new GetClients(sharedClientRepository)

export function Clients() {
  const [clients, setClients] = useState<Client[]>([])

  const loadClients = async () => {
    const list = await getClients.execute()
    setClients(list)
  }

  useEffect(() => {
    loadClients()
  }, [])

  const handleEdit = async (payload: {
    id: string
    name: string
    contactName: string
    email: string
    phone: string
  }) => {
    await updateClient.execute({
      id: payload.id,
      name: payload.name,
      contactName: payload.contactName || undefined,
      email: payload.email || undefined,
      phone: payload.phone || undefined,
    })
    await loadClients()
  }

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1>Clients</h1>
        <CreateClientDialog onCreated={loadClients} />
      </div>

      <ClientsDesktop clients={clients} onEdit={handleEdit} />
      <ClientsMobile clients={clients} onEdit={handleEdit} />
    </AppLayout>
  )
}

import { useMemo, useState } from "react"

import { Client } from "@domain/entities/Client"
import { EditClientDialog } from "@/ui/pages/EditClientDialog"
import { Input } from "@/ui/components/ui/input"

interface Props {
  clients: Client[]
  onEdit: (payload: {
    id: string
    name: string
    contactName: string
    email: string
    phone: string
  }) => Promise<void>
}

function ClientCard({
  client,
  onEdit,
}: {
  client: Client
  onEdit: Props["onEdit"]
}) {
  return (
    <div className="flex flex-col rounded-xl p-4 ring-1 ring-foreground/10 gap-2">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold">{client.name}</p>
        <EditClientDialog client={client} onSave={onEdit} />
      </div>
      {client.contactName && (
        <p className="text-sm text-muted-foreground">Contact: {client.contactName}</p>
      )}
      {client.email && (
        <p className="text-sm text-muted-foreground">Email: {client.email}</p>
      )}
      {client.phone && (
        <p className="text-sm text-muted-foreground">Phone: {client.phone}</p>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        Added {new Date(client.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}

export function ClientsMobile({ clients, onEdit }: Props) {
  const [search, setSearch] = useState("")

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return clients
    return clients.filter((client) =>
      [client.name, client.contactName, client.email, client.phone]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(query))
    )
  }, [clients, search])

  return (
    <div className="md:hidden">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search clients..."
        className="mb-4"
      />

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} onEdit={onEdit} />
        ))}
        {filteredClients.length === 0 && (
          <p className="text-sm text-muted-foreground">No clients found</p>
        )}
      </div>
    </div>
  )
}

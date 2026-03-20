import { useEffect, useState } from "react"

import { Client } from "@domain/entities/Client"

import { Button } from "@/ui/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Input } from "@/ui/components/ui/input"

interface Props {
  client: Client
  onSave: (payload: {
    id: string
    name: string
    contactName: string
    email: string
    phone: string
  }) => Promise<void>
}

export function EditClientDialog({ client, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(client.name)
  const [contactName, setContactName] = useState(client.contactName || "")
  const [email, setEmail] = useState(client.email || "")
  const [phone, setPhone] = useState(client.phone || "")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setName(client.name)
      setContactName(client.contactName || "")
      setEmail(client.email || "")
      setPhone(client.phone || "")
      setError(null)
    }
  }, [open, client])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Client name is required")
      return
    }

    await onSave({
      id: client.id,
      name,
      contactName,
      email,
      phone,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Name</label>
            <Input value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

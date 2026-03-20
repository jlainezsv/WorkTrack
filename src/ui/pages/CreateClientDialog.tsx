import { useState } from "react"

import { CreateClient } from "@application/use-cases/CreateClient"
import { sharedClientRepository } from "@infrastructure/SharedRepository"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"

const createClient = new CreateClient(sharedClientRepository)

interface Props {
  onCreated: () => void
}

export function CreateClientDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Client name is required")
      return
    }

    try {
      await createClient.execute({
        name,
        contactName: contactName || undefined,
        email: email || undefined,
        phone: phone || undefined,
      })

      setName("")
      setContactName("")
      setEmail("")
      setPhone("")
      setOpen(false)
      onCreated()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Client</DialogTitle>
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

          <Button type="submit">Create Client</Button>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}

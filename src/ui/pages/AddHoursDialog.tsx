import { useState } from "react"

import { RegisterTimeEntry } from "@application/use-cases/RegisterTimeEntry"
import { sharedClientRepository, sharedEmployeeRepository, sharedTimeEntryRepository } from "@infrastructure/SharedRepository"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Button } from "@/ui/components/ui/button"
import { Field, FieldLabel } from "@/ui/components/ui/field"
import { Input } from "@/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/components/ui/select"
import { Textarea } from "@/ui/components/ui/textarea"

const registerTimeEntry = new RegisterTimeEntry(
  sharedTimeEntryRepository,
  sharedEmployeeRepository
)

interface Props {
  employeeId: string
  employeeName?: string
  onCreated: () => void
}

export function AddHoursDialog({ employeeId, employeeName, onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [clients, setClients] = useState<any[]>([])
  const [clientName, setClientName] = useState("")
    const loadClients = async () => {
      const list = await sharedClientRepository.findAll()
      setClients(list)
    }

    const handleOpenChange = (value: boolean) => {
      setOpen(value)
      if (value) loadClients()
    }

  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      await registerTimeEntry.execute({
        id: crypto.randomUUID(),
        employeeId,
        startTime: new Date(start),
        endTime: new Date(end),
        clientName: clientName || undefined,
        description: description || undefined
      })

      setSuccess("Time entry registered successfully")
      setStart("")
      setEnd("")
      setClientName("")
      setDescription("")

      onCreated()
      setTimeout(() => {
        setOpen(false)
      }, 400)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Hours</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{employeeName ? `Add Hours to ${employeeName}` : "Add Worked Hours"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel>Start Date & Time</FieldLabel>
            <Input
              type="datetime-local"
              value={start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStart(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel>End Date & Time</FieldLabel>
            <Input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel>Client</FieldLabel>
            <Select value={clientName} onValueChange={(value) => setClientName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
            <Textarea
              id="textarea-message"
              placeholder="Type your message here."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Field>

          <Button type="submit">Register Time Entry</Button>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </form>
      </DialogContent>
    </Dialog>
  )
}
import { useState, useEffect } from "react"

import { RegisterTimeEntry } from "@application/use-cases/RegisterTimeEntry"
import { sharedTimeEntryRepository, sharedEmployeeRepository, sharedClientRepository } from "@infrastructure/SharedRepository"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"
import { Textarea } from "@/ui/components/ui/textarea"
import { Field, FieldLabel } from "@/ui/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/components/ui/select"

const registerTimeEntry = new RegisterTimeEntry(sharedTimeEntryRepository, sharedEmployeeRepository)

interface Props {
  variant?: "link" | "ghost" | "outline" | "default" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AddHoursMenuDialog({ variant = "link", size = "lg", className }: Props = {}) {
  const [open, setOpen] = useState(false)
  const [employeeId, setEmployeeId] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [clientName, setClientName] = useState("")
  const [description, setDescription] = useState("")
  const [employees, setEmployees] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      sharedEmployeeRepository.findAll().then(setEmployees)
      sharedClientRepository.findAll().then(setClients)
    }
  }, [open])

  const resetForm = () => {
    setEmployeeId("")
    setStart("")
    setEnd("")
    setClientName("")
    setDescription("")
    setError(null)
    setSuccess(null)
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) resetForm()
  }

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
        description: description || undefined,
      })

      setSuccess("Time entry registered successfully")
      setEmployeeId("")
      setStart("")
      setEnd("")
      setClientName("")
      setDescription("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          Add Hours
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Worked Hours</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Employee *</label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.employeeCode} — {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnd(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel>Client</FieldLabel>
            <Select value={clientName} onValueChange={setClientName}>
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
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Type your message here."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button type="submit" className="w-full">
            Register Time Entry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

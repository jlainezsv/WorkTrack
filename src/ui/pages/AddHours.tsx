import { useState } from "react"
import { sharedTimeEntryRepository } from "@infrastructure/SharedRepository"
import { RegisterTimeEntry } from "@application/use-cases/RegisterTimeEntry"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"
import { useEffect } from "react"
import { AppLayout } from "@/ui/components/AppLayout"

import { Button } from "@/ui/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/ui/components/ui/field"
import { Input } from "@/ui/components/ui/input"
import { Textarea } from "@/ui/components/ui/textarea"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/ui/components/ui/select"

const registerTimeEntry = new RegisterTimeEntry(
  sharedTimeEntryRepository,
  sharedEmployeeRepository
)


export function AddHours() {
  const [employeeId, setEmployeeId] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [employees, setEmployees] = useState<any[]>([])
  const [clientName, setClientName] = useState("")
  const [description, setDescription] = useState("")

  async function loadEmployees() {
    const list = await sharedEmployeeRepository.findAll()
    setEmployees(list)
  }

  useEffect(() => {
    loadEmployees()
  }, [])

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
    <AppLayout>
      <h1>Add Worked Hours</h1>
    
      <form onSubmit={handleSubmit}>
        <div>
          <Select value={employeeId}  
          onValueChange={(value) => setEmployeeId(value)}>
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

        <div className="my-6">
          <Field>
            <FieldLabel>Start Date & Time</FieldLabel>
            <Input placeholder="Start Date & Time"
              type="datetime-local"
              value={start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStart(e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="my-6">
          <Field>
            <FieldLabel>End Date & Time</FieldLabel>
            <Input placeholder="End Date & Time"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="my-6">
          <Field>
            <FieldLabel>Client Name</FieldLabel>
            <Input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
            />
          </Field>
        </div>

        <div className="my-6">
          <Field>
            <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
            <Textarea id="textarea-message" placeholder="Type your message here." value={description}
            onChange={e => setDescription(e.target.value)} />
          </Field>
        </div>

        <div className="my-6">
          <Button type="submit">Register Time Entry</Button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </AppLayout>
  )
}
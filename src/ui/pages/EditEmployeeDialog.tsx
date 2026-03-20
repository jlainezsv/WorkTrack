import { useState } from "react"
import { Employee } from "@domain/entities/Employee"
import type { EmployeeStatus } from "@domain/entities/Employee"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"
import { Switch } from "@/ui/components/ui/switch"
import { Label } from "@/ui/components/ui/label"

interface Props {
  employee: Employee
  onUpdated: () => void
  onSave: (id: string, name: string, photoUrl: string, status: EmployeeStatus) => Promise<void>
}

export function EditEmployeeDialog({ employee, onUpdated, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(employee.name)
  const [photoUrl, setPhotoUrl] = useState(employee.photoUrl || "")
  const [active, setActive] = useState(employee.status === "active")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(employee.id, name, photoUrl, active ? "active" : "inactive")
    setOpen(false)
    onUpdated()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <Input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="employee-status"
              checked={active}
              onCheckedChange={setActive}
            />
            <Label htmlFor="employee-status">
              {active ? "Active" : "Inactive"}
            </Label>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
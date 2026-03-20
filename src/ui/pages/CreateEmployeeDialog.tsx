import { useState } from "react"

import { CreateEmployee } from "@application/use-cases/CreateEmployee"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/components/ui/dialog"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"

const createEmployee = new CreateEmployee(sharedEmployeeRepository)

interface Props {
  onCreated: () => void
}

export function CreateEmployeeDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Employee name is required")
      return
    }

    try {
      await createEmployee.execute({
        name,
        photoUrl: photoUrl || undefined
      })

      setName("")
      setPhotoUrl("")
      setOpen(false)
      onCreated()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Employee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name *
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Photo URL (optional)
            </label>

            <Input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Employee Code: Generated automatically
          </div>

          <div className="text-sm text-muted-foreground">
            Status: Active
          </div>

          <div className="text-sm text-muted-foreground">
            Created: When saved
          </div>

          <Button type="submit">
            Create Employee
          </Button>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
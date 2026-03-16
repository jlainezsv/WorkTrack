import { useEffect, useState } from "react"

import { CreateEmployee } from "@application/use-cases/CreateEmployee"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"
import { Employee } from "@domain/entities/Employee"

import { AppLayout } from "@/ui/components/AppLayout"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"

import { EmployeesTable } from "../components/employee/EmployeesTable"
import { EmployeesCards } from "../components/employee/EmployeesCards"

const createEmployee = new CreateEmployee(sharedEmployeeRepository)

export function Employees() {
  const [name, setName] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([])
  const [photoUrl, setPhotoUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

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
      loadEmployees()

    } catch (err: any) {
      setError(err.message)
    }
  }


  return (
    <AppLayout>

      <h1>Employees</h1>
      <div className="md:my-16 my-6">
        <EmployeesCards employees={employees} />
        <EmployeesTable employees={employees} />
      </div>
      
  
      <div className="mt-20 max-w-md">

        <h3 className="text-lg font-semibold mb-4">
          Create Employee
        </h3>

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
      </div>

    </AppLayout>
  )
}
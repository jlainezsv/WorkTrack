import { Employee } from "@/domain/entities/Employee"
import { Link } from "react-router-dom"

interface Props {
  employees: Employee[]
}

export function EmployeesCards({ employees }: Props) {
  return (
    <div className="grid gap-4 md:hidden">
      {employees.map((emp) => (
        <div key={emp.id}>
                
                <Link to={`employee/${emp.id}`} className="w-full text-left flex flex-col rounded-xl p-4 ring-1 ring-foreground/10 max-w-sm">
                        <p className="font-semibold">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                        ID: {emp.employeeCode}
                        </p>
                </Link>
        </div>
      ))}
    </div>
  )
}
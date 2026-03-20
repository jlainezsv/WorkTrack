import { Employee } from "@/domain/entities/Employee"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"

interface Props {
  employees: Employee[]
}

function EmployeeRows({ employees }: { employees: Employee[] }) {
  if (employees.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
          No employees found
        </TableCell>
      </TableRow>
    )
  }
  return (
    <>
      {employees.map(emp => (
        <TableRow key={emp.id}>
          <TableCell className="w-[120px]">
            <Link to={`/employee/${emp.id}`} className="font-medium underline">
              {emp.employeeCode}
            </Link>
          </TableCell>
          <TableCell>{emp.name}</TableCell>
          <TableCell>
            {emp.status === "active" ? "Active" : "Inactive"}
          </TableCell>
          <TableCell>
            {emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : "-"}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export function EmployeesDesktop({ employees }: Props) {
  const active = employees.filter(e => e.status === "active")
  const inactive = employees.filter(e => e.status === "inactive")

  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmployeeRows employees={active} />
        </TableBody>
      </Table>

      <h2 className="mt-20 mb-4">Inactive Employees</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmployeeRows employees={inactive} />
        </TableBody>
      </Table>
    </div>
  )
}
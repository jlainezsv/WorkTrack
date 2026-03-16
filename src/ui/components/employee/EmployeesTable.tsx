import { Employee } from "@/domain/entities/Employee"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"

interface Props {
  employees: Employee[]
}

export function EmployeesTable({ employees }: Props) {
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

            {employees.map(emp => (

              <TableRow key={emp.id}>
                <TableCell className="w-[120px]">
                  <Link
                    to={`/employee/${emp.id}`}
                    className="font-medium underline"
                  >
                    {emp.employeeCode}
                  </Link>
                </TableCell>

                <TableCell>{emp.name}</TableCell>

                <TableCell>
                  {emp.status === "active" ? "Active" : "Inactive"}
                </TableCell>

                <TableCell>
                  {emp.createdAt
                    ? new Date(emp.createdAt).toLocaleDateString()
                    : "-"
                  }
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
    </div>
  )
}
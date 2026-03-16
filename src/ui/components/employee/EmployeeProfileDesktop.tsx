import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"
import { Button } from "@/ui/components/ui/button"
import { StatusBadge } from "@/ui/components/StatusBadge"

import { Employee } from "@domain/entities/Employee"
import { TimeEntry } from "@domain/entities/TimeEntry"

interface Props {
  employee: Employee | null
  entries: TimeEntry[]
  totalHours: number
  paidHours: number
  unpaidHours: number
}

export function EmployeeProfileDesktop({
  entries,
  handleToggleStatus,
}: Props & { handleToggleStatus: (entry: TimeEntry) => void }) {
  return (
    <div className="hidden md:block">

      <Table className="mb-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 text-center">Date</TableHead>
              <TableHead className="w-1/6">Client</TableHead>
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="w-1/12">Start</TableHead>
              <TableHead className="w-1/12">End</TableHead>
              <TableHead className="w-1/12 text-center">Total</TableHead>
              <TableHead className="w-1/12 text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-center">{new Date(entry.startTime).toLocaleDateString()}</TableCell>
                <TableCell>{entry.clientName || "-"}</TableCell>
                <TableCell>{entry.description || "-"}</TableCell>
                <TableCell>
                  {new Date(entry.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </TableCell>
                <TableCell>
                  {new Date(entry.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {entry.getDurationInHours().toFixed(1)}
                </TableCell>
                
                
                <TableCell className="text-center capitalize"><StatusBadge status={entry.status} /></TableCell>
                <TableCell className="text-center">
                  
                  <Button onClick={() => handleToggleStatus(entry)} variant="outline" className="w-full">
                    {entry.status === "paid"
                      ? "Mark as Unpaid"
                      : "Mark as Paid"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    </div>
  )
}
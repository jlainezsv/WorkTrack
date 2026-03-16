import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { GetEmployeeHours } from "@application/use-cases/GetEmployeeHours"

import { TimeEntry } from "@domain/entities/TimeEntry"
import { Employee } from "@domain/entities/Employee"

import { AppLayout } from "@/ui/components/AppLayoutFull"
import { Button } from "@/ui/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"



import { sharedTimeEntryRepository } from "@infrastructure/SharedRepository"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"
import { updateTimeEntryStatus } from "@infrastructure/SharedRepository"

const getEmployeeHours = new GetEmployeeHours(
  sharedTimeEntryRepository,
  sharedEmployeeRepository
)

export function EmployeeProfile() {
  
  const { id } = useParams()
  const [entries, setEntries] = useState<TimeEntry[]>([])
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [totalHours, setTotalHours] = useState(0)
  const [paidHours, setPaidHours] = useState(0)
  const [unpaidHours, setUnpaidHours] = useState(0)
  // const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const DEFAULT_AVATAR = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee?.name || "")}`

  const loadEmployeeData = async () => {
    if (!id) return

    const result = await getEmployeeHours.execute(id)

    setEntries(result.entries)
    setTotalHours(result.totalHours)
    setPaidHours(result.paidHours)
    setUnpaidHours(result.unpaidHours)

    const emp = await sharedEmployeeRepository.findById(id)
    setEmployee(emp)
  }

  const handleToggleStatus = async (entry: TimeEntry) => {

      const nextStatus =
        entry.status === "paid" ? "unpaid" : "paid";

      await updateTimeEntryStatus.execute(entry.id, nextStatus);

      // luego refrescas los datos
      await loadEmployeeData();
  };
  useEffect(() => {
    async function load() {
      if (!id) return

      const result = await getEmployeeHours.execute(id)

      setEntries(result.entries)
      setTotalHours(result.totalHours)
      setPaidHours(result.paidHours)
      setUnpaidHours(result.unpaidHours)

      const emp = await sharedEmployeeRepository.findById(id)
      setEmployee(emp)
    }

    load()
  }, [id])

  return (
    <AppLayout>
      <div className="flex gap-4 align-middle mb-20">
        <div className="flex flex-wrap items-center gap-2">
          <img
            src={employee?.photoUrl || DEFAULT_AVATAR}
            alt={employee?.name || "Employee"}
            className="rounded-full size-32 content-cover"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-semibold">
            {employee?.name}
          </h1>

          <p className="text-muted-foreground">
            Code: {employee?.employeeCode}
          </p>

          <p className="text-muted-foreground capitalize">
            Status: {employee?.status}
          </p>

          <p className="text-muted-foreground text-sm">
            ID: {employee?.id}
          </p>
        </div>
      </div>

      <div className="flex w-full justify-between mt-10 mb-2">
        <h2>Total Hours: {totalHours}</h2>
        <Link to={`/add-hours/${id}`}>
          <Button>Add Hours</Button>
        </Link>
      </div>
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
                
                
                <TableCell className="text-center capitalize">{entry.status}</TableCell>
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

      <p>Paid Hours: {paidHours}   |   Unpaid Hours: {unpaidHours}</p>
    </AppLayout>
  )
}
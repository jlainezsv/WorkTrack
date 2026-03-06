import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { GetEmployeeHours } from "@application/use-cases/GetEmployeeHours"

import { TimeEntry } from "@domain/entities/TimeEntry"
import { Employee } from "@domain/entities/Employee"

import { AppLayout } from "@/ui/components/AppLayout"
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
      <h3></h3>

      <div className="flex w-full justify-between mt-10 mb-2">
        <h2>Total Hours: {totalHours}</h2>
        <Link to={`/add-hours/${id}`}>
          <Button>Add Hours</Button>
        </Link>
      </div>
      <Table className="mb-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">Client</TableHead>
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="w-1/12 text-center">Hours</TableHead>
              <TableHead className="w-1/12 text-center">Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.clientName || "-"}</TableCell>
                <TableCell>{entry.description || "-"}</TableCell>
                <TableCell className="text-center">
                  {entry.getDurationInHours().toFixed(2)}
                </TableCell>
                
                
                <TableCell className="text-center capitalize">{entry.status}</TableCell>
                <TableCell>
                  
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
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { GetEmployeeHours } from "@application/use-cases/GetEmployeeHours"
import { Button } from "@/ui/components/ui/button"

import { TimeEntry } from "@domain/entities/TimeEntry"
import { Employee } from "@domain/entities/Employee"

import { AppLayout } from "@/ui/components/AppLayoutFull"



import { sharedTimeEntryRepository } from "@infrastructure/SharedRepository"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"
import { updateTimeEntryStatus } from "@infrastructure/SharedRepository"

import { EmployeeProfileDesktop } from "../components/employee/EmployeeProfileDesktop"
import { EmployeeProfileMobile } from "../components/employee/EmployeeProfileMobile"

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
      <div className="flex gap-4 align-middle mb-10">
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

          <p className="hidden text-muted-foreground text-sm">
            ID: {employee?.id}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between mt-10 mb-2">
        <p className="text-lg md:text-2xl font-bold">Total Hours: {totalHours}</p>
        <Link to={`/add-hours/${id}`}>
          <Button>Add Hours</Button>
        </Link>
      </div>
      <div className="my-3">
          <EmployeeProfileMobile 
            employee={employee}
            entries={entries}
            totalHours={totalHours}
            paidHours={paidHours}
            unpaidHours={unpaidHours}
            handleToggleStatus={handleToggleStatus}
          />
          <EmployeeProfileDesktop 
            employee={employee}
            entries={entries}
            totalHours={totalHours}
            paidHours={paidHours}
            unpaidHours={unpaidHours}
            handleToggleStatus={handleToggleStatus}
          />
      </div>

      <p>Paid Hours: {paidHours}   |   Unpaid Hours: {unpaidHours}</p>
    </AppLayout>
  )
}
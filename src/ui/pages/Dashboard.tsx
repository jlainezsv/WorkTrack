import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetDashboardSummary } from "@application/use-cases/GetDashboardSummary"
import { sharedTimeEntryRepository } from "@infrastructure/SharedRepository"
import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"

import { AppLayout } from "@/ui/components/AppLayout"
import { Button } from "@/ui/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"

const getDashboardSummary = new GetDashboardSummary(
  sharedTimeEntryRepository,
  sharedEmployeeRepository
)

export function Dashboard() {
  const [summary, setSummary] = useState<
    { employeeId: string; employeeName: string; totalHours: number }[]
  >([])

  useEffect(() => {
    async function load() {
      const dashboardData = await getDashboardSummary.execute()
      setSummary(dashboardData)
    }

    load()
  }, [])

  return (
    <AppLayout>
      <h1>WorkTrack</h1>
      
      <div className="my-6">
        <div className="flex w-full justify-between mt-10 mb-2">
        <h2>Dashboard</h2>
          <Link to="/add-hours">
            <Button>Add Hours</Button>
          </Link>
        </div>
        
        <Table>
          <TableCaption>A list of worked hours by employee.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Worked Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.map((item) => (
              <TableRow key={item.employeeId}>
                <TableCell>
                  <Link to={`/employee/${item.employeeId}`}>
                    {item.employeeId}
                  </Link>
                </TableCell>
                <TableCell>{item.employeeName}</TableCell>
                <TableCell>{item.totalHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </AppLayout>
  )
}
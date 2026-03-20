import { useState } from "react"
import { Employee } from "@/domain/entities/Employee"
import { Link } from "react-router-dom"
import { Button } from "@/ui/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/components/ui/collapsible"

interface Props {
  employees: Employee[]
}

function EmployeeCard({ emp }: { emp: Employee }) {
  return (
    <div key={emp.id}>
      <Link
        to={`employee/${emp.id}`}
        className="w-full text-left flex flex-col rounded-xl p-4 ring-1 ring-foreground/10 max-w-sm"
      >
        <p className="font-semibold">{emp.name}</p>
        <p className="text-sm text-muted-foreground">ID: {emp.employeeCode}</p>
      </Link>
    </div>
  )
}

export function EmployeesMobile({ employees }: Props) {
  const [showInactive, setShowInactive] = useState(false)
  const active = employees.filter(e => e.status === "active")
  const inactive = employees.filter(e => e.status === "inactive")

  return (
    <div className="md:hidden">
      <div className="grid gap-4">
        {active.map(emp => <EmployeeCard key={emp.id} emp={emp} />)}
        {active.length === 0 && (
          <p className="text-muted-foreground text-sm">No active employees</p>
        )}
      </div>

      <div className="mt-10">
        <Collapsible open={showInactive} onOpenChange={setShowInactive}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Inactive Employees</h2>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                {showInactive ? "Hide" : "Show"} ({inactive.length})
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-4 overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
            <div className="grid gap-4">
              {inactive.map(emp => <EmployeeCard key={emp.id} emp={emp} />)}
              {inactive.length === 0 && (
                <p className="text-muted-foreground text-sm">No inactive employees</p>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
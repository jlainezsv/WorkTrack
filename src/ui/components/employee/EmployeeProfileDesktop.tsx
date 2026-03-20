import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/ui/components/ui/table"
import { Button } from "@/ui/components/ui/button"
import { StatusBadge } from "@/ui/components/StatusBadge"
import { Badge } from "@/ui/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/components/ui/tooltip"

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
}: Props & { handleToggleStatus: (entry: TimeEntry, paidAt?: string) => void }) {
  const [payingEntryId, setPayingEntryId] = useState<string | null>(null)
  const [paidDate, setPaidDate] = useState(new Date().toISOString().split("T")[0])

  const beginPayFlow = (entryId: string) => {
    setPayingEntryId(entryId)
    setPaidDate(new Date().toISOString().split("T")[0])
  }

  const cancelPayFlow = () => {
    setPayingEntryId(null)
  }

  const confirmPay = (entry: TimeEntry) => {
    handleToggleStatus(entry, paidDate)
    setPayingEntryId(null)
  }

  const getPaidDateLabel = (entry: TimeEntry) => {
    if (!entry.paidAt) return "not set"
    return new Date(`${entry.paidAt}T00:00:00`).toLocaleDateString()
  }

  return (
    <div className="hidden md:block">
      <TooltipProvider delayDuration={100}>
      <Table className="mb-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 text-center">Date</TableHead>
              <TableHead className="w-1/6">Client</TableHead>
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="w-1/12">Start</TableHead>
              <TableHead className="w-1/12">End</TableHead>
              <TableHead className="w-1/12 text-center">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
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
                
                
                <TableCell className="text-center capitalize">
                  {entry.status === "paid" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="cursor-help"
                          aria-label={`Paid on ${getPaidDateLabel(entry)}`}
                        >
                          <Badge className="bg-green-600 hover:bg-green-600 text-white text-sm p-2">
                            Paid
                          </Badge>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Paid on: {getPaidDateLabel(entry)}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <StatusBadge status={entry.status} />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {entry.status === "paid" ? (
                    <Button onClick={() => handleToggleStatus(entry)} variant="outline" className="w-full">
                      Mark as Unpaid
                    </Button>
                  ) : payingEntryId === entry.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={paidDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setPaidDate(e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                      />
                      <Button onClick={() => confirmPay(entry)} variant="outline" size="sm">
                        Save
                      </Button>
                      <Button onClick={cancelPayFlow} variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => beginPayFlow(entry.id)} variant="outline" className="w-full">
                      Mark as Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>

    </div>
  )
}
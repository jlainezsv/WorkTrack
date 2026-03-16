import { useState } from "react"
import { Employee } from "@domain/entities/Employee"
import { TimeEntry } from "@domain/entities/TimeEntry"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/components/ui/collapsible"

import { StatusBadge } from "@/ui/components/StatusBadge"

import { Button } from "@/ui/components/ui/button"
import { ChevronsUpDown } from "lucide-react"

interface Props {
  employee: Employee | null
  entries: TimeEntry[]
  totalHours: number
  paidHours: number
  unpaidHours: number
}

export function EmployeeProfileMobile({
  entries,
  handleToggleStatus,
}: Props & { handleToggleStatus: (entry: TimeEntry) => void }) {

  // 🔹 ahora guardamos el ID abierto
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="md:hidden">

      {entries.map((entry) => {

        const isOpen = openId === entry.id

        return (
          <Collapsible
            key={entry.id}
            open={isOpen}
            onOpenChange={() =>
              setOpenId(isOpen ? null : entry.id)
            }
            className="w-full flex flex-col border rounded-md p-4 mb-2"
          >

            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">
                        {entry.getDurationInHours().toFixed(1)} h
                        </p>

                        <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>
                            {new Date(entry.startTime).toLocaleDateString()}
                        </span>
                        </div>
                    </div>

                    <span>
                        <StatusBadge status={entry.status} />
                    </span>
                </div>
              

                <CollapsibleTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="size-12"
                    >
                    <ChevronsUpDown />
                    </Button>
                </CollapsibleTrigger>

            </div>

            <CollapsibleContent className="">
                <div className="pt-3 flex flex-col gap-2">
                    <div className="flex justify-between border rounded-md px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Client</span>
                        <span>{entry.clientName || "-"}</span>
                    </div>

                    <div className="flex justify-between border rounded-md px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Description</span>
                        <span>{entry.description}</span>
                    </div>

                    <div className="flex justify-between border rounded-md px-3 py-2 text-sm">
                        <span className="text-muted-foreground">Start</span>
                        <span>
                        {new Date(entry.startTime).toLocaleTimeString()}
                        </span>
                    </div>

                    <div className="flex justify-between border rounded-md px-3 py-2 text-sm">
                        <span className="text-muted-foreground">End</span>
                        <span>
                        {new Date(entry.endTime).toLocaleTimeString()}
                        </span>
                    </div>

                    <div className="pt-3">
                        <Button
                        onClick={() => handleToggleStatus(entry)}
                        variant="secondary"
                        className="w-full"
                        >
                        {entry.status === "paid"
                            ? "Mark as Unpaid"
                            : "Mark as Paid"}
                        </Button>
                    </div>
                </div>
            </CollapsibleContent>

          </Collapsible>
        )
      })}

    </div>
  )
}
"use client"

import * as React from "react"
import { Button } from "@/ui/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { AppLayout } from "@ui/components/AppLayout"

export function TestComponents() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <AppLayout>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col border rounded-md p-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Order #4189</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle details</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2 mt-2">
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Shipping address</p>
            <p className="text-muted-foreground">100 Market St, San Francisco</p>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Items</p>
            <p className="text-muted-foreground">2x Studio Headphones</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col border rounded-md p-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Order #4189</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown />
              <span className="sr-only">Toggle details</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2 mt-2">
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Shipping address</p>
            <p className="text-muted-foreground">100 Market St, San Francisco</p>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Items</p>
            <p className="text-muted-foreground">2x Studio Headphones</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </AppLayout>
  )
}

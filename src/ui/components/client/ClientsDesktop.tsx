import { useMemo, useState } from "react"

import { Client } from "@domain/entities/Client"
import { EditClientDialog } from "@/ui/pages/EditClientDialog"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/ui/table"

interface Props {
  clients: Client[]
  onEdit: (payload: {
    id: string
    name: string
    contactName: string
    email: string
    phone: string
  }) => Promise<void>
}

export function ClientsDesktop({ clients, onEdit }: Props) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return clients
    return clients.filter((client) =>
      [client.name, client.contactName, client.email, client.phone]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(query))
    )
  }, [clients, search])

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedClients = filteredClients.slice(startIndex, startIndex + pageSize)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setCurrentPage(1)
  }

  return (
    <div className="hidden md:block">
      <div className="flex flex-row gap-3 items-center justify-between mb-4">
        <Input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by name, contact, email or phone"
          className="max-w-xl"
        />

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Rows:</span>
          <select
            className="border rounded-md h-9 px-2 bg-background"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.contactName || "-"}</TableCell>
              <TableCell>{client.email || "-"}</TableCell>
              <TableCell>{client.phone || "-"}</TableCell>
              <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-center">
                <EditClientDialog client={client} onSave={onEdit} />
              </TableCell>
            </TableRow>
          ))}
          {filteredClients.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                No clients found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex flex-row gap-3 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredClients.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + pageSize, filteredClients.length)} of {filteredClients.length} clients
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

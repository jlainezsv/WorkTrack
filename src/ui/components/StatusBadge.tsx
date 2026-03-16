import { Badge } from "@/ui/components/ui/badge"

interface Props {
  status: "paid" | "unpaid"
}

export function StatusBadge({ status }: Props) {

  if (status === "paid") {
    return (
      <Badge className="bg-green-600 hover:bg-green-600 text-white text-sm p-2">
        Paid
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="text-sm p-2">
      Unpaid
    </Badge>
  )
}
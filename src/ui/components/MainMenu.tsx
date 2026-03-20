import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { AddHoursMenuDialog } from "@/ui/pages/AddHoursMenuDialog"

export function MainMenu() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const employeesActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/employee")

  const clientsActive = location.pathname.startsWith("/clients")

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="mb-8 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between h-14">
        <span className="text-xl font-bold tracking-tight">WorkTrack</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/">
            <Button variant={employeesActive ? "secondary" : "ghost"} size="sm">
              Employees
            </Button>
          </NavLink>

          <AddHoursMenuDialog variant="ghost" size="sm" />

          <NavLink to="/clients">
            <Button variant={clientsActive ? "secondary" : "ghost"} size="sm">
              Clients
            </Button>
          </NavLink>

          <div className="ml-2 pl-2 border-l">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-1 py-3 border-t mt-1">
          <NavLink to="/" onClick={closeMobile} className="w-full">
            <Button
              variant={employeesActive ? "secondary" : "ghost"}
              size="lg"
              className="w-full justify-start"
            >
              Employees
            </Button>
          </NavLink>

          <AddHoursMenuDialog variant="ghost" size="lg" className="w-full justify-start" />

          <NavLink to="/clients" onClick={closeMobile} className="w-full">
            <Button
              variant={clientsActive ? "secondary" : "ghost"}
              size="lg"
              className="w-full justify-start"
            >
              Clients
            </Button>
          </NavLink>

          <div className="flex items-center gap-2 px-3 pt-3 mt-1 border-t">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}

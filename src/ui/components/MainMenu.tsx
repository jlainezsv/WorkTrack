import { NavLink, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

export function MainMenu() {
  const location = useLocation()

  const employeesActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/employee")

  return (
    <nav className="flex gap-2 mb-4">

      <NavLink to="/">
        <Button
          variant={employeesActive ? "secondary" : "link"}
          size="lg"
        >
          Employees
        </Button>
      </NavLink>

      <NavLink to="/add-hours">
        {({ isActive }) => (
          <Button
            variant={isActive ? "secondary" : "link"}
            size="lg"
          >
            Add Hours
          </Button>
        )}
      </NavLink>

    </nav>
  )
}

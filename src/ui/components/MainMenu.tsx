import { Link } from "react-router-dom"

export function MainMenu() {
  return (
    <nav style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/add-hours">Add Hours</Link>
      <Link to="/employees">Employees</Link>
    </nav>
  )
}

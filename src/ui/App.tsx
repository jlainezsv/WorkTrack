import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { AddHours } from "./pages/AddHours"
import { EmployeeProfile } from "./pages/EmployeeProfile"
import { Employees } from "./pages/Employees"


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-hours" element={<AddHours />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  )
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { AddHours } from "./pages/AddHours"
import { EmployeeProfile } from "./pages/EmployeeProfile"
import { Employees } from "./pages/Employees"


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/add-hours" element={<AddHours />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  )
}
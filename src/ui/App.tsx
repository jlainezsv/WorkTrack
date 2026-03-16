import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { Dashboard } from "./pages/Dashboard"
import { AddHours } from "./pages/AddHours"
import { EmployeeProfile } from "./pages/EmployeeProfile"
import { Employees } from "./pages/Employees"
import { TestComponents } from "./pages/TestComponents" 


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/add-hours" element={<AddHours />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/testcomponents" element={<TestComponents />} />
        {/* <Route path="/employees" element={<Employees />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
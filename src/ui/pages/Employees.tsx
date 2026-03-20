import { useEffect, useState } from "react"

import { sharedEmployeeRepository } from "@infrastructure/SharedRepository"
import { Employee } from "@domain/entities/Employee"

import { AppLayout } from "@/ui/components/AppLayout"

import { EmployeesDesktop } from "../components/employee/EmployeesDesktop"
import { EmployeesMobile } from "../components/employee/EmployeesMobile"
import { CreateEmployeeDialog } from "./CreateEmployeeDialog"

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])

  async function loadEmployees() {
    const list = await sharedEmployeeRepository.findAll(true)
    setEmployees(list)
  }

  useEffect(() => {
    loadEmployees()
  }, [])


  return (
    <AppLayout>
      <div className=" flex items-center justify-between">
        <h1>Employees</h1>
        <CreateEmployeeDialog onCreated={loadEmployees} />
      </div>
      <div className="my-6">
        <EmployeesMobile employees={employees} />
        <EmployeesDesktop employees={employees} />
      </div>

    </AppLayout>
  )
}
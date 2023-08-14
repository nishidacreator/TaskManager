import { Role } from "./role"

export interface User {
  id: number
  name: string
  phoneNumber: string
  email: string
  password: string
  roleId: number
  role: Role
  status: string
  qualification: string
  joiningDate: Date
  employeeId: string
  dateOfBirth: Date
}

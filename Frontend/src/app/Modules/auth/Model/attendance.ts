import { Trainee } from "../../admin/Models/trainee"
import { User } from "./user"

export interface Attendance{
  id: number
  userId : number
  user: User
  type : string
  dateTime : Date
  traineeId : number
  trainee : Trainee
}

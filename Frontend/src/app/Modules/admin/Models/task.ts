import { User } from "../../auth/Model/user"
import { Trainee } from "./trainee"

export interface Task{
  id : number
  by : User
  user : User
  traineeId : number
  trainee : Trainee
  description : string
  assignedBy : number
  assignedTo : number
  assignedOn : Date
  deadline : Date
  status : string,
  remarks: string
  projectId: number
}


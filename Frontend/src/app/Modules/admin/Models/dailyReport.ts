import { Task } from "./task"

export interface DailyReport{
  id : Number
  description : string
  taskId: number
  task: Task
  status : string
  date: Date
}


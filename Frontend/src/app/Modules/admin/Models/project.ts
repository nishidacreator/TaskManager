import { Client } from "./client"

export interface Project{
  id : number,
  clientId: number,
  client: Client
  projectName : string,
  description : string,
  startDate: Date,
  endDate: Date,
  status : string,
  frontend: string,
  backend: string,
  database: string,
  remarks:string
  deadline: Date
}


import { User } from "../../auth/Model/user";

export interface Ticket{
    id : number
   title:string
   description:string
   file:string,
   userId:number;
   user:User
   taskId:number;
   status:string;
   ticketNo:string;
   taskcompleted: string;
   completionComment: string;


  }

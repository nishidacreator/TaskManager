import { Ticket } from "./ticket";
import { User } from "../../auth/Model/user";

export interface TicketComment{

id :number;
comment:string;
commentedBy:string;
ticketId:number;
ticket :Ticket
userId:number;
user:User
}


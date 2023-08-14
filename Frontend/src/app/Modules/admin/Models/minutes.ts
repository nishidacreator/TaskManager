import { User } from "../../auth/Model/user";
import { MinutesDetails } from "./minutesDetails";
import { Project } from "./project";
export interface Minutes {
    date: string;
    time: string;
    atendees: string;
    agenda: string;
    minutes: string;
    projectId: number;
    project: Project
    minutesDetails: MinutesDetails;
    userId: number
    user: User
  }

import { Trainee } from "../../admin/Models/trainee"
import { User } from "../../auth/Model/user"

export interface Leave
{
    reason: string,
    userId: number,
    user: User
    fromDate: Date,
    toDate: Date
    status: string
    leaveType: string
    traineeId: number
    trainee: Trainee
}

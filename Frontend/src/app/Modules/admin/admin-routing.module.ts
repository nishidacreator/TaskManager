import { TraineeDetailsComponent } from './components/SettingsPage/Trainee/trainee-details/trainee-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './HomePage/dashboard/dashboard.component';
import { HomeComponent } from './HomePage/home/home.component';
import { NavbarComponent } from './HomePage/navbar/navbar.component';
import { SettingsComponent } from './components/SettingsPage/settings/settings.component';
import { UserComponent } from './components/SettingsPage/UserTab/user/user.component';
import { EditUserComponent } from './components/SettingsPage/UserTab/edit-user/edit-user.component';
import { RoleComponent } from './components/SettingsPage/RoleTab/role/role.component';
import { EditRoleComponent } from './components/SettingsPage/RoleTab/edit-role/edit-role.component';
import { UserDetailsComponent } from './components/SettingsPage/UserTab/user-details/user-details.component';
import { TicketComponent } from './components/Task/ticket/ticket.component';
import { EditTraineeComponent } from './components/SettingsPage/Trainee/edit-trainee/edit-trainee.component';
import { ClientManageComponent } from './components/Task/client-manage/client-manage.component';
import { DailyReportComponent } from './components/Task/daily-report/daily-report.component';
import { ProjectManageComponent } from './components/Task/project-manage/project-manage.component';
import { TaskManageComponent } from './components/Task/task-manage/task-manage.component';
import { ViewAssignedTaskComponent } from './components/Task/view-assigned-task/view-assigned-task.component';
import { TicketSystemComponent } from '../employee/Components/ticket-system/ticket-system.component';
import { LeaveManagementComponent } from '../employee/Components/leave-management/leave-management.component';
import { TraineeComponent } from './components/SettingsPage/Trainee/trainee/trainee.component';
import { ViewLeaveComponent } from './components/Leave/view-leave/view-leave.component';
import { MinutesOfMeetingComponent } from './components/Minute/minutes-of-meeting/minutes-of-meeting.component';
import { ViewDailyReportComponent } from './components/Task/view-daily-report/view-daily-report.component';
import { ViewMinutesComponent } from './components/Minute/view-minutes/view-minutes.component';
import { ViewMinuteDetailsComponent } from './components/Minute/view-minute-details/view-minute-details.component';
import { EmergencyLeaveComponent } from './components/Leave/emergency-leave/emergency-leave.component';
import { TicketCommentComponent } from './components/Task/ticket-comment/ticket-comment.component';
import { ViewTicketResponseComponent } from '../employee/Components/view-ticket-response/view-ticket-response.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: 'home', component: DashboardComponent},
      {path: '', component:DashboardComponent},
      {path: 'settings', component:SettingsComponent},
      {path: 'settings/userdetails/:id', component:UserDetailsComponent},
      {path: 'settings/adduser', component:UserComponent},
      {path: 'settings/edituser/:id', component:EditUserComponent},

      {path: 'settings/addrole', component:RoleComponent},
      {path: 'settings/editrole/:id', component:EditRoleComponent},

      {path: 'settings/traineedetails/:id', component:TraineeDetailsComponent},
      {path: 'settings/edittrainee/:id', component:EditTraineeComponent},
      {path: 'settings/addtrainee', component:TraineeComponent},

      {path:'ticket',component: TicketComponent},
      {path: 'addticket', component: TicketSystemComponent},
      {path:'ticketResponse/:id',component:TicketCommentComponent},
      {path:'viewResponse/:id',component:ViewTicketResponseComponent},

      {path:'requestleave', component: LeaveManagementComponent},
      {path:'leaveRequestList', component: ViewLeaveComponent},
      {path:'leaveRequestList/addleave', component: EmergencyLeaveComponent},

      {path: 'task', component: TaskManageComponent},
      {path: 'viewdailyReport/:id' ,component:ViewDailyReportComponent},
      {path: 'viewAssignedTask', component: ViewAssignedTaskComponent},
      {path: 'dailyReport/:id' ,component:DailyReportComponent},

      {path: 'clients', component: ClientManageComponent},
      {path: 'project', component: ProjectManageComponent},

      {path:'minutes', component:MinutesOfMeetingComponent},
      {path:'minutes/viewminutes', component:ViewMinutesComponent},
      {path:'minutes/viewminutes/:id', component: ViewMinuteDetailsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../Shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './HomePage/home/home.component';
import { NavbarComponent } from './HomePage/navbar/navbar.component';
import { DashboardComponent } from './HomePage/dashboard/dashboard.component';
import { SettingsComponent } from './components/SettingsPage/settings/settings.component';
import { UserComponent } from './components/SettingsPage/UserTab/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './components/SettingsPage/UserTab/view-user/view-user.component';
import { EditUserComponent } from './components/SettingsPage/UserTab/edit-user/edit-user.component';
import { RoleComponent } from './components/SettingsPage/RoleTab/role/role.component';
import { ViewRoleComponent } from './components/SettingsPage/RoleTab/view-role/view-role.component';
import { EditRoleComponent } from './components/SettingsPage/RoleTab/edit-role/edit-role.component';
import { UserDetailsComponent } from './components/SettingsPage/UserTab/user-details/user-details.component';
import { AttendanceComponent } from './components/SettingsPage/AttendanceTab/attendance/attendance.component';
import { ViewAttendanceComponent } from './components/SettingsPage/AttendanceTab/view-attendance/view-attendance.component';
import { TicketComponent } from './components/Task/ticket/ticket.component';
import { ViewTraineesComponent } from './components/SettingsPage/Trainee/view-trainees/view-trainees.component';
import { AcceptTraineeComponent } from './components/SettingsPage/Trainee/accept-trainee/accept-trainee.component';
import { TraineeDetailsComponent } from './components/SettingsPage/Trainee/trainee-details/trainee-details.component';
import { EditTraineeComponent } from './components/SettingsPage/Trainee/edit-trainee/edit-trainee.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
//AMINA
import { TaskManageComponent } from './components/Task/task-manage/task-manage.component';
import { ProjectManageComponent } from './components/Task/project-manage/project-manage.component';
import { ClientManageComponent } from './components/Task/client-manage/client-manage.component';
import { ViewAssignedTaskComponent } from './components/Task/view-assigned-task/view-assigned-task.component';
import { DailyReportComponent } from './components/Task/daily-report/daily-report.component';
import { TraineeComponent } from './components/SettingsPage/Trainee/trainee/trainee.component';
import { ViewLeaveComponent } from './components/Leave/view-leave/view-leave.component';
import { MinutesOfMeetingComponent } from './components/Minute/minutes-of-meeting/minutes-of-meeting.component';
import { ViewDailyReportComponent } from './components/Task/view-daily-report/view-daily-report.component';
import { TicketViewerComponent } from './components/Task/ticket-viewer/ticket-viewer.component';
import { ViewMinutesComponent } from './components/Minute/view-minutes/view-minutes.component';
import { ViewMinuteDetailsComponent } from './components/Minute/view-minute-details/view-minute-details.component';
import { EmergencyLeaveComponent } from './components/Leave/emergency-leave/emergency-leave.component';
import { TicketCommentComponent } from './components/Task/ticket-comment/ticket-comment.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    SettingsComponent,
    UserComponent,
    ViewUserComponent,
    EditUserComponent,
    RoleComponent,
    ViewRoleComponent,
    EditRoleComponent,
    UserDetailsComponent,
    AttendanceComponent,
    ViewAttendanceComponent,
    TicketComponent,
    ViewTraineesComponent,
    AcceptTraineeComponent,
    TraineeDetailsComponent,
    EditTraineeComponent,
    ProjectManageComponent,
    ClientManageComponent,
    ViewAssignedTaskComponent,
    DailyReportComponent,
    TaskManageComponent,
    TraineeComponent,
    ViewLeaveComponent,
    MinutesOfMeetingComponent,
    ViewDailyReportComponent,
    TicketViewerComponent,
    ViewMinutesComponent,
    ViewMinuteDetailsComponent,
    EmergencyLeaveComponent,
    TicketCommentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,


    AdminRoutingModule,

    FullCalendarModule,
    PdfViewerModule,





  ],
  providers: [
    DatePipe
  ]
})
export class AdminModule { }

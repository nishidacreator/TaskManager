import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { HomeComponent } from './Home/home/home.component';
import { NavbarComponent } from './Home/navbar/navbar.component';
import { TicketSystemComponent } from './Components/ticket-system/ticket-system.component';
import { LeaveManagementComponent } from './Components/leave-management/leave-management.component';
import { EditUserComponent } from '../admin/components/SettingsPage/UserTab/edit-user/edit-user.component';
import { UserDetailsComponent } from '../admin/components/SettingsPage/UserTab/user-details/user-details.component';
import { ViewAssignedTaskComponent } from '../admin/components/Task/view-assigned-task/view-assigned-task.component';
import { ViewTicketResponseComponent } from './Components/view-ticket-response/view-ticket-response.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: 'home', component: DashboardComponent},
      {path: '', component: HomeComponent},
      {path:'addticket',component:TicketSystemComponent},
      {path:'leave',component:LeaveManagementComponent},


      {path: 'viewAssignedTask', component: ViewAssignedTaskComponent },
      {path: 'viewResponse/:id', component: ViewTicketResponseComponent },

      {path: 'myprofile/:id', component:UserDetailsComponent},
      {path: 'settings/edituser/:id', component:EditUserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

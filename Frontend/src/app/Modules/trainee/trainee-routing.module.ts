import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../trainee/Components/Home/dashboard/dashboard.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { NavbarComponent } from './Components/Home/navbar/navbar.component';
import { EditTraineeComponent } from '../admin/components/SettingsPage/Trainee/edit-trainee/edit-trainee.component';
import { TraineeDetailsComponent } from '../admin/components/SettingsPage/Trainee/trainee-details/trainee-details.component';
import { ViewAssignedTaskComponent } from '../admin/components/Task/view-assigned-task/view-assigned-task.component';
import { LeaveManagementComponent } from '../employee/Components/leave-management/leave-management.component';
import { TicketSystemComponent } from '../employee/Components/ticket-system/ticket-system.component';

const routes: Routes = [
  {path: '', component:NavbarComponent,
    children:[
      {path: 'home', component: DashboardComponent},
      {path: '', component: HomeComponent},

      {path: 'settings/traineedetails/:id', component:TraineeDetailsComponent},
      {path: 'myprofile/:id', component:EditTraineeComponent},
      {path:'addticket',component:TicketSystemComponent},
      {path:'leave',component:LeaveManagementComponent},

      {path: 'viewAssignedTask', component: ViewAssignedTaskComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeRoutingModule { }

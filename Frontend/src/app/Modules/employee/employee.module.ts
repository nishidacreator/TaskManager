import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Shared/material/material.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './Home/home/home.component';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { NavbarComponent } from './Home/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketSystemComponent } from './Components/ticket-system/ticket-system.component';
import { LeaveManagementComponent } from './Components/leave-management/leave-management.component';
import { ViewTicketResponseComponent } from './Components/view-ticket-response/view-ticket-response.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    TicketSystemComponent,
    LeaveManagementComponent,
    ViewTicketResponseComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule,
    MatProgressBarModule,
    MatSliderModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }

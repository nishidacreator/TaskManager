import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Shared/material/material.module';
import { TraineeRoutingModule } from './trainee-routing.module';
import { NavbarComponent } from './Components/Home/navbar/navbar.component';
import { DashboardComponent } from './Components/Home/dashboard/dashboard.component';
import { HomeComponent } from './Components/Home/home/home.component';


@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule,
    MaterialModule
  ]
})
export class TraineeModule { }

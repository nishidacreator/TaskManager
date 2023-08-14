import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/Guards/auth.guard';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./Modules/auth/auth.module').then(x=>x.AuthModule)},
  {path:'admin',loadChildren:()=>import('./Modules/admin/admin.module').then(x=>x.AdminModule), canActivate: [AuthGuard]},
  {path:'employee',loadChildren:()=>import('./Modules/employee/employee.module').then(x=>x.EmployeeModule), canActivate: [AuthGuard]},
  {path:'trainee',loadChildren:()=>import('./Modules/trainee/trainee.module').then(x=>x.TraineeModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

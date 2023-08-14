import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { Trainee } from '../../../../Models/trainee';
import { AdminService } from '../../../../admin.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AcceptTraineeComponent } from 'src/app/Modules/admin/components/SettingsPage/Trainee/accept-trainee/accept-trainee.component';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  // standalone: true,
})
export class ViewTraineesComponent {

  ngOnDestroy(){
    // this.deleteSub.unsubscribe()
  }

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService, private router: Router, private dialog: MatDialog){}

  ngOnInit(){
    this.getTrainee()
  }

  displayedColumns : string[] = ['name', 'phoneNumber','email','view','manage']
  displayedColumnsJoin : string[] = ['name', 'traineeId','trainingMode', 'trainingPeriod','view','manage']
  displayedColumnsComp : string[] = ['name', 'endDate','startDate','view','manage']
  displayedColumnsPend : string[] = ['name', 'qualification','experience','view','manage']

  regTrainee: Trainee[] = [];
  joinTrainee: Trainee[] = [];
  completeTrainee: Trainee[] = [];
  pendTrainee: Trainee[] = [];
  traineSub!: Subscription
  getTrainee(){
    this.traineSub = this.adminService.getTrainee().subscribe(res=>{
      let trainee = res;
      this.regTrainee = res.filter(r => r.status.toLowerCase() === 'registered')
      this.joinTrainee = res.filter(r => r.status.toLowerCase() === 'joined')
      this.completeTrainee = res.filter(r => r.status.toLowerCase() === 'completed')
      this.pendTrainee = res.filter(r => r.status.toLowerCase() === 'pending')
    })

  }

  acceptTrainee(id: number){
    const dialogRef = this.dialog.open(AcceptTraineeComponent, {
      width: '400px',
      data: {
        traineeId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._snackBar.open("Trainee Status updated successfully...","" ,{duration:3000})
        this.getTrainee()
      }
    })
  }


  rejectTrainee(id: number){
    let trianee = {
      status: 'Pending',
    }
    console.log(trianee)

    this.adminService.updatetraineeStatus(id, trianee).subscribe(res=>{
      console.log(res)
    })
  }

  viewDetails(id: number){
    this.router.navigateByUrl('/admin/settings/traineedetails/'+ id)
  }

  editRow(id: number){
    this.router.navigateByUrl('/admin/settings/edituser/'+ id)
  }

  deleteSub!: Subscription;
  deleteRow(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(id)
        this.deleteSub = this.adminService.deleteTrainee(id).subscribe((res)=>{
          this.getTrainee()
          this._snackBar.open("Trainee deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  statusTrainee(id: number){
    let trianee = {
      status: 'Completed',
      endDate: new Date()
    }

    this.adminService.updatetraineeStatus(id, trianee).subscribe(res=>{
      console.log(res)
    })
  }
}

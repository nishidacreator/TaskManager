
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { Minutes } from '../../../Models/minutes';
import { AdminService } from '../../../admin.service';
import { MinutesDetails } from '../../../Models/minutesDetails';

@Component({
  selector: 'app-view-minute-details',
  templateUrl: './view-minute-details.component.html',
  styleUrls: ['./view-minute-details.component.scss']
})
export class ViewMinuteDetailsComponent {
  ngOnDestroy(){
    // this.deleteSub.unsubscribe()
  }

  id! : number
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute){
      this.id = route.snapshot.params['id']
    }

  meetingForm = this.fb.group({
    description: ['', Validators.required],
    status: ['', Validators.required],
    remarks: ['']
  })

  ngOnInit(){
    this.getMinuteDetails()
  }

  displayedColumns : string[] = ['description','remarks', 'status', 'updatedOn','manage']

  minutes$!: Observable<MinutesDetails[]>;
  getMinuteDetails(){
    this.minutes$ = this.adminService.getMinutesDetailsByMinuteId(this.id)
  }

  isEdit: boolean = false;
  minuteDetId!: number;
  editRow(id: number){
    this.isEdit = true;

    this.adminService.getMinutesDetailsById(id).subscribe((res)=>{
      let minute = res
      console.log(minute);

      let description = minute.description?.toString()
      let remarks = minute.remarks?.toString()
      let status = minute.status?.toString()

      this.meetingForm.patchValue({
        description: description,
        remarks: remarks,
        status: status
      })
    })
    this.minuteDetId = id
  }

  editFunction(){
    this.isEdit = false;
    let data = {
      minutesId : this.id,
      description : this.meetingForm.get('description')?.value,
      remarks : this.meetingForm.get('remarks')?.value,
      status : this.meetingForm.get('status')?.value,
      updatedOn : new Date()
    }
    console.log(data)
    this.adminService.updateMinutesDetails(this.minuteDetId, data).subscribe((res)=>{
      this._snackBar.open("Minute details updated successfully...","" ,{duration:3000})
      console.log(res)
      this.clearControls()
      this.getMinuteDetails()
    })
  }

  clearControls(){
    this.meetingForm.reset()
    this.meetingForm.setErrors(null)
    Object.keys(this.meetingForm.controls).forEach(key=>{this.meetingForm.get(key)?.setErrors(null)})
  }

  deleteSub!: Subscription;
  deleteRow(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSub = this.adminService.deleteMinutesDetails(id).subscribe((res)=>{
          this.getMinuteDetails()
          this._snackBar.open("Minute details deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  addStat: boolean = false
  add(){
    this.addStat = true
  }

  onSubmit(){
    this.addStat = false
    let data = {
      minutesId : this.id,
      description : this.meetingForm.get('description')?.value,
      remarks : this.meetingForm.get('remarks')?.value,
      status : this.meetingForm.get('status')?.value,
      updatedOn : new Date()
    }

    this.adminService.addMinutDetails(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Minute details added successfully...","" ,{duration:3000})
      this.getMinuteDetails()
      this.clearControls()
    })
  }
}

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Leave } from 'src/app/Modules/employee/Model/leave';
import { EmployeeService } from 'src/app/Modules/employee/employee.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { User } from 'src/app/Modules/auth/Model/user';

@Component({
  selector: 'app-emergency-leave',
  templateUrl: './emergency-leave.component.html',
  styleUrls: ['./emergency-leave.component.scss']
})
export class EmergencyLeaveComponent {
  userId!: number
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private adminService: AdminService,
    private _snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService,
    public dialogRef: MatDialogRef<EmergencyLeaveComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any)
      {
        const token: any = localStorage.getItem('token')
        let user = JSON.parse(token)
        console.log(user)
        this.userId = user.id
        console.log(this.userId)
      }

  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.getLeave()
    this.getUsers()
  }

    leaveRequestForm= this.formBuilder.group({
      reason: ['', Validators.required],
      userId: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    }
  )

  users: User[] = [];
  getUsers(){
    this.authService.getUser().subscribe(u=>{
        this.users = u;
    })
  }

  leave!: any
  submitForm() {
    let data = {
      userId: this.leaveRequestForm.get('userId')?.value,
      reason: this.leaveRequestForm.get('reason')?.value,
      fromDate: this.leaveRequestForm.get('fromDate')?.value,
      toDate: this.leaveRequestForm.get('toDate')?.value,
      status: 'Emergency',
      leaveType: 'Emergency Leave'
    }
    console.log(data)
    this.empService.addLeave(data).subscribe((res)=>{
      console.log(res)
      this.leave = res
      this.dataSubmitted.emit(this.leave);
      this.dialogRef.close(true);
    })
    this.clearControls()
  }

  clearControls(){
    this.leaveRequestForm.reset()
    this.leaveRequestForm.setErrors(null)
  }

  leaves: Leave[] = []
  getLeave(){
    this.adminService.getLeaveList().subscribe((res)=>{
      this.leaves = res.filter(leave => leave.status.toLowerCase() === 'emergency')
      console.log(this.leaves)
      if(this.data.id != undefined){
        this.adminService.getLeaveById(this.data.id).subscribe((res)=>{
          let leave = res

          let fromDate:any = leave.fromDate
          let toDate: any = leave.toDate
          let reason = leave.reason
          let userId: any = leave.userId

          this.leaveRequestForm.patchValue({
            fromDate: fromDate,
            toDate: toDate,
            reason: reason,
            userId: userId
          })
        })
      }
    })
  }

  editFunction(){
    this.data.status = false;
    let data = {
      userId: this.leaveRequestForm.get('userId')?.value,
      reason: this.leaveRequestForm.get('reason')?.value,
      fromDate: this.leaveRequestForm.get('fromDate')?.value,
      toDate: this.leaveRequestForm.get('toDate')?.value,
      status: 'Emergency',
      leaveType: 'Emergency Leave'
    }

    this.empService.editLeave(data, this.data.id).subscribe((res)=>{
      this._snackBar.open("Leave updated successfully...","" ,{duration:3000})
      this.getLeave()
      this.clearControls();
      this.dialogRef.close(true);
    },(error=>{
          alert(error.message)
        }))
  }

  cancel(){
    this.dialogRef.close();
  }
}


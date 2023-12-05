import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { Leave } from '../../Model/leave';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent {

  // leaveRequestForm!: FormGroup;

  userId!: number
  userRole!: string
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private adminService: AdminService,
    private _snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthService) {
    const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      this.userId = user.id
      this.userRole = user.role

      this.authService.getRoleById(user.role).subscribe((res)=>{
        this.userRole = res.roleName.toLowerCase()
      })
   }

  ngOnInit() {
    this.getLeave()
  }

    leaveRequestForm= this.formBuilder.group({
      reason: [''],
      userId: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: [''],
      leaveType: ['', Validators.required]
    }
  )

  data: any
  submitForm() {
    console.log(this.userRole)
    if(this.userRole === 'trainee'){
        this.data = {
          traineeId: this.userId,
          reason: this.leaveRequestForm.get('reason')?.value,
          fromDate: this.leaveRequestForm.get('fromDate')?.value,
          toDate: this.leaveRequestForm.get('toDate')?.value,
          status: 'Requested',
          leaveType: this.leaveRequestForm.get('leaveType')?.value
      }
    }
    else{
      this.data = {
        userId: this.userId,
        reason: this.leaveRequestForm.get('reason')?.value,
        fromDate: this.leaveRequestForm.get('fromDate')?.value,
        toDate: this.leaveRequestForm.get('toDate')?.value,
        status: 'Requested',
        leaveType: this.leaveRequestForm.get('leaveType')?.value
      }
    }
    console.log(this.data)
    this.empService.addLeave(this.data).subscribe((res)=>{
      console.log(res)
      this.clearControls()
      this.getLeave()
    })

  }

  clearControls(){
    this.leaveRequestForm.reset()
    this.leaveRequestForm.setErrors(null)
  }

  displayedColumns : string[] = ['userId','leaveType','reason','fromDate', 'toDate', 'status', 'action']

  leaves: Leave[] = []
  getLeave(){
    this.adminService.getLeaveList().subscribe((res)=>{
      if(this.userRole === 'trainee'){
        this.leaves = res.filter(leave => leave.traineeId === this.userId)
        console.log(this.leaves)
      }
      else{
        this.leaves = res.filter(leave => leave.userId === this.userId)
        console.log(this.leaves)
      }

    })
  }

  leaveId: any;
  isEdit = false;
  editLeave(id: any){
    console.log(id)
    this.isEdit = true;
    this.leaveId = id
    console.log(id)
    this.empService.getLeaveById(this.leaveId).subscribe(res =>{
      let leave = res
      console.log(leave)

      //  Populate the object by the ID

      let reason: any = leave.reason
      let fromDate: any = leave.fromDate
      let toDate: any = leave.toDate
      let status: any = leave.status
      let leaveType: any = leave.leaveType

      this.leaveRequestForm.patchValue({
        reason : reason,
        fromDate : fromDate,
        toDate: toDate,
        leaveType: leaveType,
        status:status
      })
    })

  }

  editFunction(){
    this.isEdit = false;
    let data: any ={
      reason : this.leaveRequestForm.get('reason')?.value,
      fromDate : this.leaveRequestForm.get('fromDate')?.value,
      toDate:this.leaveRequestForm.get('toDate')?.value,
      leaveType : this.leaveRequestForm.get('leaveType')?.value,
      status : this.leaveRequestForm.get('status')?.value

      }

      this.empService.editLeave(data, this.leaveId).subscribe((res)=>{
        this._snackBar.open("Leave updated successfully...","" ,{duration:3000})
        this.getLeave()
        this.clearControls();
      },(error=>{
            alert(error.message)
          }))
  }

  deleteLeave(id: number){
    console.log('id'+id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.empService.deleteLeave(id).subscribe((res)=>{
          this._snackBar.open("Leave deleted successfully...","" ,{duration:3000})
          this.getLeave()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }


}


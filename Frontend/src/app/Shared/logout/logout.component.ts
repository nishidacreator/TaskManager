import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private _snackBar: MatSnackBar
  ) {}

  roleName!: string
  ngOnInit(): void {
    this.authService.getRoleById(this.data.role).subscribe((role) => {
      this.roleName = role.roleName.toLowerCase();
      console.log(this.roleName);
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  logData!: any
  onConfirmClick(): void {
    if(this.roleName === 'trainee') {
      this.logData = {
        traineeId : this.data.id,
        dateTime : new Date(),
        type : 'LogOut'
      }
    }
    else{
      this.logData = {
        userId : this.data.id,
        dateTime : new Date(),
        type : 'LogOut'
      }
    }

    console.log(this.logData);
    this.authService.addAttendance(this.logData).subscribe((res)=>{
      console.log(res);
      this._snackBar.open("Attendance added successfully...","" ,{duration:3000})
    },(error=>{
      console.log(error)
      this._snackBar.open(error.error.message,"" ,{duration:3000})
    }))
    this.dialogRef.close(true);
  }


}

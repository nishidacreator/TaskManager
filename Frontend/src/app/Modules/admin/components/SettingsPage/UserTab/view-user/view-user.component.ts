import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Modules/auth/Model/user';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { AdminService } from '../../../../admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

  ngOnDestroy(){
    // this.deleteSub.unsubscribe()
  }

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService, private router: Router, private dialog: MatDialog){}

  ngOnInit(){
    this.getUser()
  }

  displayedColumns : string[] = ['id','name', 'employeeId','roleId','view','manage']

  users$!: Observable<User[]>;
  getUser(){
    this.users$ = this.authService.getUser()
    this.users$.subscribe((res)=>{
      console.log(res)
    })
  }

  viewDetails(id: number){
    this.router.navigateByUrl('/admin/settings/userdetails/'+ id)
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
        this.deleteSub = this.authService.deleteUser(id).subscribe((res)=>{
          this.getUser()
          this._snackBar.open("User deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }
}


import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/Modules/auth/Model/role';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent {

  constructor(private authService:AuthService, private dialog: MatDialog, private _snackBar: MatSnackBar,
    private router: Router){}

  ngOnInit() {
    this.getRole()
  }

  displayedColumns : string[] = ['id','roleName', 'status','manage']

  role$!: Observable<Role[]>
  getRole(){
    this.role$ = this.authService.getRole()
  }

  editRow(id: number){
    this.router.navigateByUrl('/admin/settings/editrole/'+ id)
  }


  deleteSub!: Subscription
  deleteRow(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(id)
        this.deleteSub = this.authService.deleteRole(id).subscribe((res)=>{
          this.getRole()
          this._snackBar.open("Role deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }
}

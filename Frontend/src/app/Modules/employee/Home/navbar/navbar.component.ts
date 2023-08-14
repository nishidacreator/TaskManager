import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { LogoutComponent } from 'src/app/Shared/logout/logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isExpanded : boolean = false;

  userName: string
  userId!: number
  userRole!: number
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar,
    private dialog: MatDialog){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userName = user.name
    this.userId = user.id
    this.userRole = user.role
  }

  logOut(){
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '440px',
      data: {
        id: this.userId,
        role: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

    this.authService.logout()
    this.router.navigateByUrl('')
  }

  myProfile(){
    this.router.navigateByUrl('employee/myprofile/'+ this.userId)
  }
}

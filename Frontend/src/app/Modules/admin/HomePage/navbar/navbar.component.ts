import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { Attendance } from 'src/app/Modules/auth/Model/attendance';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { LogoutComponent } from 'src/app/Shared/logout/logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isExpanded : boolean = true;

  userName: string
  userId!: number
  userRole!: number
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar,private dialog: MatDialog) {

    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userName = user.name
    this.userId = user.id
    this.userRole = user.role
    this.startCounter();
  }

  myProfile(){
    this.router.navigateByUrl('admin/settings/userdetails/'+ this.userId)
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
      if (result === true) {
       
      }
    });


    this.authService.logout()
    this.router.navigateByUrl('')
  }

  private intervalId: any;
  seconds: number = 0;
  formattedTime: string = '00:00:00';
  startCounter(): void {
    this.intervalId = setInterval(() => {
      this.seconds++;
      this.updateFormattedTime();
    }, 1000);
  }

  updateFormattedTime(): void {
    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds % 3600) / 60);
    const seconds = this.seconds % 60;

    this.formattedTime = `${this.formatTimeUnit(hours)}:${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
  }

  formatTimeUnit(unit: number): string {
    return unit.toString().padStart(2, '0');
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}



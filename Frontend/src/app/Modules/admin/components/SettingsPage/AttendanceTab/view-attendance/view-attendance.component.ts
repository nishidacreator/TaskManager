import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Attendance } from 'src/app/Modules/auth/Model/attendance';
import { User } from 'src/app/Modules/auth/Model/user';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent {

  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.attnSub.unsubscribe();
  }

  constructor(private authService: AuthService, datePipe: DatePipe){}

  ngOnInit(){
    this.getUsers()
    this.getAttendance()
  }

  users: User[] = [];
  userSub! : Subscription;
  getUsers(){
    this.userSub = this.authService.getUser().subscribe((res)=>{
      this.users = res;
      console.log(this.users);
      this.filteredOptions = this.users
    })
  }

  //Search in MatSelect
  myControl = new FormControl<string | User>('');
  filteredOptions: User[] = [];
  filterOptions(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    this.filteredOptions = this.users.filter(option =>
      (option.name && option.name.toLowerCase().includes(value?.toLowerCase()))
    );
  }

  attnSub!: Subscription;
  attendance: Attendance[] = [];
  getAttendance(){
    this.attnSub = this.authService.getAttendance().subscribe((res)=>{
      this.attendance = res;
      console.log(this.attendance)
      this.filAttendanceIn = this.attendance.filter(x=>x.type.toLowerCase() == 'login')
      this.filAttendanceOut = this.attendance.filter(x=>x.type.toLowerCase() == 'logout')
    })
  }

  filAttendanceIn: Attendance[] = [];
  filAttendanceOut: Attendance[] = [];
  getAttendanceByUser(id: number){
    this.filAttendanceIn = this.attendance.filter(x=> (x.userId == id) && x.type.toLowerCase() == 'login')
    this.filAttendanceOut = this.attendance.filter(x=> (x.userId == id) && x.type.toLowerCase() == 'logout')
  }

  datePipe = new DatePipe('en-US')
  attendaceByDate(event: any){
    const selectedDate = event.value;
    console.log(selectedDate)
    const formattedDate  = selectedDate.toLocaleDateString().split("T")[0]
    console.log(formattedDate)
    this.filAttendanceIn = this.attendance.filter(x=>(this.datePipe.transform(x.dateTime, 'dd/MM/yyyy') == formattedDate) && x.type.toLowerCase() == 'login')
    this.filAttendanceOut = this.attendance.filter(x=>(this.datePipe.transform(x.dateTime, 'dd/MM/yyyy') == formattedDate) && x.type.toLowerCase() == 'logout')
  }

  displayedColumns : string[] = ['userId', 'date', 'time']

}

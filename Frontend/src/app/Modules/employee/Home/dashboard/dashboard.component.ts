import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from 'src/app/Modules/admin/admin.service';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';

import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Task } from 'src/app/Modules/admin/Models/task';
import { Ticket } from 'src/app/Modules/admin/Models/ticket';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @Input()
  tasksDone!:10;
  @Input()
  totalTaskss!:100;

  get completionPercentage(): number {
    return (this.tasksDone / this.totalTaskss) * 100;
  }

  isLoading: boolean = true; // Set this to true when the task is still loading
  taskStatus: string = '';   // Set this to 'done' or 'not done' based on the actual task status

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  currenttime: Date = new Date();
  currentTime!: string;
  currentDay!: string;



  constructor(private fb: FormBuilder,private adminService: AdminService,private router:Router, private authService: AuthService,
    private cdr: ChangeDetectorRef){
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      console.log(user)
      this.userName = user.name
      console.log(this.userName)
      this.userId = user.id
      console.log(this.userId)

      this.authService.getRoleById(user.role).subscribe((res)=>{
        this.userRole = res.roleName.toLowerCase()
        console.log(this.userRole)
      })
  }
  ngOnInit() {
    this.getTickets()

    this.getDashboardBoxValues()
    this.getCurrentDateAndMonth()
    setInterval(() => {
      this.currenttime = new Date();
    }, 1000);
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);



  }
  tasks: any;
  projects:any;
  tickets:any
  totalCompletedTask: any;
  totalPendingTask: any
  completedTaskCount!: number
  assignedTaskCount!: number
  projectsCount!: number
  ticketsCount!: number


  getDashboardBoxValues(){
    this.adminService.getTask().subscribe((res)=>{
      this.tasks = res.filter(x=> x.assignedTo === this.userId)
      console.log(this.tasks)

      const totalCompletedTask = this.tasks.filter((item: Task) => item.status === 'completed');
      const totalPendingTask = this.tasks.filter((item: Task) => item.status === 'assigned');
      this.completedTaskCount = totalCompletedTask.length
      this.assignedTaskCount = totalPendingTask.length
      // console.log(this.completedTaskCount)
      // console.log(this.assignedTaskCount)
    })

    this.adminService.getProject().subscribe((res) => {
      this.projects = res
      this.projectsCount = res.length
    })

    this.adminService.getTickets().subscribe((res) => {
      this.tickets = res
      this.ticketsCount = res.length
    })


  }



  userName!: string
  userId!: number
  userRole!: string



  updateTime() {
    const now = new Date();
    this.currentTime = this.formatTime(now);
    this.currentDay = this.formatDay(now);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString();
  }

  formatDay(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
  currentDate!: string;
  currentMonth!: string;






 getCurrentDateAndMonth() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  };

  this.currentDate = today.toLocaleDateString(undefined, options);
  this.currentMonth = today.toLocaleString('default', { month: 'long' });
}

  totalTasks!: number;

completedTasks: number = 90;
progressPercentage: number = 0;






// updateSlider(): void {
//   this.completedTasks = this.getProgress();
// }

// updateProgressPercentage(): void {
//   this.progressPercentage = this.getProgress();
//   this.cdr.detectChanges();
// }

  openTickets: any;
 closedTickets : any
 openTicketsCount:any
 closedTicketsCount : any

getTickets(){
  this.adminService.getTickets().subscribe((res) => {
    console.log(res)
    this.openTickets = res.filter((x) => x.status === 'Raised'); // Corrected status check
    this.openTicketsCount = this.openTickets.length; // Store the count in a separate variable
  });

  this.adminService.getTickets().subscribe((res) => {
    this.closedTickets = res.filter((x) => x.status === 'Completed'); // Corrected status check
    this.closedTicketsCount = this.closedTickets.length; // Store the count in a separate variable
  });

}
}

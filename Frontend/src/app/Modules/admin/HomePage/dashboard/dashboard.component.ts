import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../Models/task';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  ngOnInit() {
    this.getDashboardBoxValues()
  }

  userId: number
  constructor(public dialog: MatDialog,private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userId = user.id
  }

  displayedColumns : string[] = ['projectName','description', 'assignedBy', 'assignedOn', 'deadline']

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

}

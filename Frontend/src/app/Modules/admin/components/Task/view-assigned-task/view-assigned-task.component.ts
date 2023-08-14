import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-view-assigned-task',
  templateUrl: './view-assigned-task.component.html',
  styleUrls: ['./view-assigned-task.component.scss']
})
export class ViewAssignedTaskComponent {
  ngOnInit() {
    this.getAssignedTasks();
  }
  displayedColumns : string[] = ['projectName','description', 'assignedBy','assignedTo', 'assignedOn', 'deadline','status','action']

  userName!: string
  userId!: number
  userRole!: string
  constructor(private fb: FormBuilder,private adminService: AdminService,private router:Router, private authService: AuthService,
    ){
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      console.log(user)
      this.userName = user.name
      this.userId = user.id

      this.authService.getRoleById(user.role).subscribe((res)=>{
        this.userRole = res.roleName.toLowerCase()
        console.log(this.userRole)
      })
  }



  assignedTask: any=[]
  getAssignedTasks(){
    this.adminService.getTask().subscribe((res)=>{
      console.log(res)
      if(this.userRole === 'trainee'){
        this.assignedTask = res.filter(x=> x.traineeId === this.userId)
        console.log(this.assignedTask);
      }
      else{
        this.assignedTask = res.filter(x=> x.assignedTo === this.userId)
        console.log(this.assignedTask);
      }

    })
  }
  // getCompanies(){

  // }
  addDailyReport(id: any){
    console.log(id)
  //   let client = this.assignedTask.find((x: { id: any; })=>{
  //   return  x.id === id;
  //  })
   this.router.navigateByUrl('admin/dailyReport/' +id)
 }

}

import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { Project } from '../../../Models/project';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Trainee } from '../../../Models/trainee';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Modules/auth/Model/user';
import { Router } from '@angular/router';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss']
})
export class TaskManageComponent {
  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.traineeSub.unsubscribe()
  }

  userName: string;
  userId: number;
  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService, private dialog: MatDialog, private router: Router){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userName = user.name
    this.userId = user.id
    console.log(this.userId)
  }

  taskForm = this.fb.group({
    projectId:['', Validators.required],
    description: ['', Validators.required],
    assignedBy: [''],
    assignedTo: [''],
    assignedOn:[''],
    deadline: ['', Validators.required],
    status:[''],
    remarks:['']
  });

  ngOnInit(): void {
    this.getTask()
    this.getProject()
    this.getUsers()
  }


  roles = [
    {name: 'Nibin'},
    {name: 'Anupama'},
    {name: 'Nishida'},
    {name: 'Amina',},
    {name: 'common'}
  ]

  displayedColumns : string[] = ['projectName','description', 'assignedBy','assignedTo', 'assignedOn', 'deadline','status','remarks','action']

  // status = [
  //   {name: 'Assigned'},
  //   {name: 'Opened'},
  //   {name: 'Closed'},
  // ]

  users: User[] = [];
  trainees: Trainee[] = [];
  userSub!: Subscription;
  traineeSub!: Subscription;
  getUsers(){
    this.userSub = this.authService.getUser().subscribe((res)=>{
      this.users = res
    })

    this.traineeSub = this.adminService.getTrainee().subscribe((res)=>{
      this.trainees = res.filter(t => t.status.toLowerCase() === 'joined')
    })
  }

  minDate: Date = new Date();

  onSubmit(){
    console.log(this.taskForm.getRawValue())
    let data ={
      projectId: this.taskForm.get('projectId')?.value,
      description :this.taskForm.get('description')?.value,
      assignedBy: this.userId,
      assignedTo: this.taskForm.get('assignedTo')?.value,
      deadline:this.taskForm.get('deadline')?.value,
      status:'assigned',
      assignedOn: Date.now(),
      remarks: this.taskForm.get('remarks')?.value
    }
    this.adminService.addTask(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Task added successfully...","" ,{duration:3000})
      this.getTask()
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }

  tasks: any;
  getTask(){
    this.adminService.getTask().subscribe((res)=>{
      this.tasks = res
      console.log(this.tasks)
    })
  }

  projects$! : Observable<Project[]>
  getProject(){
    this.projects$ = this.adminService.getProject()
    console.log(this.projects$)
  }

  taskId: any;
  isEdit = false;
  editTask(id: any){
    this.isEdit = true;
    this.taskId = id
    console.log(id)
    this.adminService.getTaskById(this.taskId).subscribe(res =>{
      let task = res
      console.log(task)

      //  Populate the object by the ID
      let projectId: any = task.projectId
      let description: any = task.description
      let assignedTo: any = task.assignedTo
      let deadline: any = task.deadline
      let status: any = task.status
      let remarks: any = task.remarks

      this.taskForm.patchValue({
        projectId : projectId,
        description : description,
        assignedTo: assignedTo,
        deadline: deadline,
        status:status,
        remarks: remarks
      })
    })
    // console.log('clientform'+this.clientId.clientName)

  }

  editFunction(){
    this.isEdit = false;
   let data: any ={
    projectId : this.taskForm.get('projectId')?.value,
    description : this.taskForm.get('description')?.value,
    assignedTo:this.taskForm.get('assignedTo')?.value,
    deadline : this.taskForm.get('deadline')?.value,
    status : this.taskForm.get('status')?.value,
    remarks:this.taskForm.get('remarks')?.value,

    }

    this.adminService.editTask(data, this.taskId).subscribe((res)=>{
      this._snackBar.open("Task updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

  deleteTask(id: any){
    console.log('id'+id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.adminService.deleteTask(id).subscribe((res)=>{
          this._snackBar.open("Task deleted successfully...","" ,{duration:3000})
          this.getTask()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }

  clearControls(){
    this.taskForm.reset()
    this.taskForm.setErrors(null)
    //Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key).setErrors(null)})
    this.getTask()
  }

  viewTaskReport(id:any){
    this.router.navigateByUrl('admin/viewdailyReport/' +id)
  }
}

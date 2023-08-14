import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin.service';
import { Project } from '../../../Models/project';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../../../Models/client';
import { Subscription } from 'rxjs/internal/Subscription';
import { DeleteComponent } from '../../../../../Shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent {

  minDate: Date = new Date();
  constructor(public dialog: MatDialog, private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar){
    this.minDate = new Date();
  }

  projectForm = this.fb.group({
    projectName: ['', Validators.required],
    description: [''],
    startDate: ['', Validators.required],
    endDate:['', Validators.required],
    deadline: ['', Validators.required],
    status:[''],
    clientId: ['', Validators.required],
    frontend: [''],
    backend: [''],
    database: [''],
    remarks:['']
  });

  ngOnInit(): void {

    this.getProject()
    this.getClients()
  }
  ngOnDestroy(): void {
    this.projecttSubscription.unsubscribe()
  }
  private projecttSubscription: Subscription = new Subscription();


  roles = [
    {name: 'Nibin'},
    {name: 'Anupama'},
    {name: 'Nishida'},
    {name: 'Amina',},
    {name: 'common'}
  ]

  displayedColumns : string[] = ['projectName', 'description','clientName','startDate','endDate', 'deadline','frontend','backend','database','status','remarks', 'action']
  // displayedColumns : string[] = ['projectName', 'clientName','startDate','status', 'view','action']

  status = [
    {name: 'Pre initialization stage'},
    {name: 'Opened'},
    {name: 'On progress'},
    {name: 'Completed'},
    {name: 'closed'}
  ]

  onSubmit(){
    console.log(this.projectForm.getRawValue())
    let data ={
      projectName :this.projectForm.get('projectName')?.value,
      description :this.projectForm.get('description')?.value,
      startDate :this.projectForm.get('startDate')?.value,
      endDate :this.projectForm.get('endDate')?.value,
      deadline :this.projectForm.get('deadline')?.value,
      status :this.projectForm.get('status')?.value,
      clientId:this.projectForm.get('clientId')?.value,
      frontend:this.projectForm.get('frontend')?.value,
      backend:this.projectForm.get('backend')?.value,
      database:this.projectForm.get('database')?.value,
      remarks:this.projectForm.get('remarks')?.value
    }
    console.log(data)
    this.projecttSubscription = this.adminService.addProject(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Project added successfully...","" ,{duration:3000})
      this.getProject()
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }

  clients$! : Observable<Client[]>
  getClients(){
    this.clients$ = this.adminService.getClients()
    console.log(this.clients$)
  }

  viewDetails(id: number){

  }


  projects: any;
  getProject(){
    this.adminService.getProject().subscribe((res)=>{
      this.projects = res
      console.log(this.projects)
    })
  }

  project: Project []=[]
  projectId: any;
  isEdit = false;
  editProject(id: any){
    this.isEdit = true;
    this.projectId = id
    // console.log('clientIddd'+this.clientId)
    this.adminService.getProjectById(this.projectId).subscribe(res =>{
      let project = res
      console.log(project)

      //  Populate the object by the ID
      let projectName = project.projectName
      let description: any = project.description
      let startDate: any = project.startDate
      let endDate: any = project.endDate
      let deadline: any = project.deadline
      let status: any = project.status
      let clientId: any = project.clientId
      let frontend: any = project.frontend
      let backend: any = project.backend
      let database: any = project.database
      let remarks: any = project.remarks

      this.projectForm.patchValue({
        projectName : projectName,
        description : description,
        startDate: startDate,
        endDate: endDate,
        deadline:deadline,
        status: status,
        clientId: clientId,
        frontend:frontend,
        backend:backend,
        database: database,
        remarks: remarks})
    })
  }

  editFunction(){
    this.isEdit = false;
   let data: any ={
    projectName : this.projectForm.get('projectName')?.value,
    description : this.projectForm.get('description')?.value,
    startDate:this.projectForm.get('startDate')?.value,
    endDate : this.projectForm.get('endDate')?.value,
    deadline : this.projectForm.get('deadline')?.value,
    status:this.projectForm.get('status')?.value,

    clientId : this.projectForm.get('clientId')?.value,
    frontend : this.projectForm.get('frontend')?.value,
    backend:this.projectForm.get('backend')?.value,

    database : this.projectForm.get('database')?.value,
    remarks : this.projectForm.get('remarks')?.value,

    }

    this.adminService.editProject(data, this.projectId).subscribe((res)=>{
      this._snackBar.open("Project updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

  deleteProject(id: any){
    console.log('id'+id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.adminService.deleteProject(id).subscribe((res)=>{
          this._snackBar.open("Project deleted successfully...","" ,{duration:3000})
          this.getProject()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }

  clearControls(){
    this.projectForm.reset()
    this.projectForm.setErrors(null)
    //Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key).setErrors(null)})
    this.getProject()
  }
  onCancelClick(){

  }

}


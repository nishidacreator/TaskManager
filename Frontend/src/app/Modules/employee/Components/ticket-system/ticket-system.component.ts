import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from '../../../admin/Models/ticket';
import { EmployeeService } from '../../employee.service';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Task } from 'src/app/Modules/admin/Models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketComment } from 'src/app/Modules/admin/Models/ticketComment';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-ticket-system',
  templateUrl: './ticket-system.component.html',
  styleUrls: ['./ticket-system.component.scss']
})
export class TicketSystemComponent {
  displayedColumns: string[] = ['ticketNo', 'title','description', 'status', 'action'];
  ticketForm!: FormGroup;
  fileToUpload: File | null = null;
  currentUserId!:any;
  currentUser!: string;
  comments: TicketComment[] = [];

  constructor(
    private empService: EmployeeService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router : Router,
    public dialog: MatDialog,
    private authService: AuthService

  ) {}

  userRole!: string
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required], // Add appropriate validators
      description: ['', Validators.required], // Add appropriate validators
      file: [''],
      userId: [],
      taskId:[''],
      ticketNo:['']
    });
    this.getTickets()
    this.getTask()

    // this.getComments();
    this.getAllComments();

    const token: any = localStorage.getItem('token');
    let user = JSON.parse(token);
    this.currentUserId = user.id;
    this.currentUser = user.name;
    this.currentUserRole = user.role;

    this.authService.getRoleById(user.role).subscribe((res)=>{
      this.userRole = res.roleName.toLowerCase()
    })
  }
  currentUserRole!: string;
  isEdit = false;
  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
    }
  }

  onSubmit(): void {
    this.getTickets()
    if (this.ticketForm.invalid) {
      return;
    }

    const formData = new FormData();

    if(this.userRole === 'trainee'){
      formData.append('userId', this.currentUserId);
    }
    else{
      formData.append('userId', this.currentUserId);
    }
    formData.append('taskId',this.ticketForm.get('taskId')?.value);
    formData.append('ticketNo',this.generateTicketNumber())
    formData.append('status','Raised')
    formData.append('title', this.ticketForm.get('title')!.value);
    formData.append('description', this.ticketForm.get('description')!.value);
    formData.append('file', this.fileToUpload || '');

    this.empService.createTicket(formData).subscribe((response) => {
      console.log(response)
        this._snackbar.open('Ticket created successfully....', '', { duration: 3000 });
        this.ticketForm.reset();
        this.fileToUpload = null;
       this.getTickets()
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );

  }
  tickets:any[]=[]
  getTickets(){
    this.adminService.getTickets().subscribe((res)=>{
      console.log(res)
      this.tickets = res.filter((x=>x.userId == this.currentUserId))
      console.log(this.tickets)
    })
  }

  viewComment(id: number) {
    console.log(id);
    if(this.userRole.toLowerCase()=='employee'){
      this.router.navigateByUrl('/employee/viewResponse/' + id);

    }
    else{
      this.router.navigateByUrl('/admin/viewResponse/' + id);

    }

  }


  getAllComments() {
    this.adminService.getComment().subscribe((res) => {
      this.comments = res

      console.log(res);
    });
  }

  // comment!: TicketComment;
ticketId:any | undefined;
// tickets: Tickett[]=[]
editFunction(id : any){
  this.isEdit = true
  this.ticketId = id;
  this.adminService.getTicketById(this.ticketId).subscribe((res)=>{
   let tkt = res
    console.log(tkt)
    //populate the object with the comment
    let file = tkt.file
    let title = tkt.title.toString()
    let description = tkt.description.toString()
    let userId= tkt.userId.toString()
    let taskId = tkt.taskId.toString()

    this.ticketForm.patchValue({
     file: file,
      title: title,
      description: description,
      userId: userId,
      taskId:taskId

    })

  })

}
private generateTicketNumber(): string {
  // Implement your quotation number generation logic here
  const prefix = 'TCK'; // Prefix for the quotation number
  // const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  // const random = Math.floor(Math.min()*100);
   // Random number between 0 and 9999
  // Combine the prefix, timestamp, and random number to generate the quotation number
  // const quoteNumber = `${prefix}-${timestamp}-${random}`;
  const quoteNumber = `${prefix}-${random}`;
  return quoteNumber;
}

edit(){
this._snackbar.open("Comment  updated successfully...","" ,{duration:3000})
this.isEdit= true
let data ={
  ticket : this.ticketForm.get('ticket')?.value,
//  file : this.ticketForm.get('file'),
 description : this.ticketForm.get('description')?.value,
 taskId : this.ticketForm.get('taskId')?.value
}
this.adminService.updateTicket(this.ticketId,data).subscribe((res)=>{
  this._snackbar.open("Comment  updated successfully...","" ,{duration:3000})
  this.clearControls()

  console.log(res)
})



}
deleteRow(id: number){
const dialogRef = this.dialog.open(DeleteComponent, {
  width: '450px',
  data: {}
});

dialogRef.afterClosed().subscribe((result) => {
  if (result === true) {

    this.adminService.deleteTicket(id).subscribe((res)=>{
      this._snackbar.open("Ticket deleted successfully...","" ,{duration:3000})
      this.getTickets()
    },(error=>{
      console.log(error)
      this._snackbar.open(error.error.message,"" ,{duration:3000})
    }))
  }
});


}
  clearControls(){
    this.ticketForm.reset()
    this.ticketForm.setErrors(null)
    this.getTickets()
  }

  task: Task[] = [];
  getTask(){
    this.adminService.getTask().subscribe(res=>{
      if(this.userRole === 'trainee'){
        this.task = res.filter(t=>t.traineeId === this.currentUserId)
      }else{
        this.task = res.filter(t=>t.assignedTo === this.currentUserId)
      }

      console.log(this.task)
    })
  }
}

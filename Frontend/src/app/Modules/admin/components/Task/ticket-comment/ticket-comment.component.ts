import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { TicketComment } from '../../../Models/ticketComment';

@Component({
  selector: 'app-ticket-comment',
  templateUrl: './ticket-comment.component.html',
  styleUrls: ['./ticket-comment.component.scss']
})
export class TicketCommentComponent {
  displayedColumns: string[] = [ 'comment' ,'action'];
  // ticketCommentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private route:ActivatedRoute,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog,) { }
    isEditMode: boolean = false;


  ngOnInit() {
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.currentUser = user.name
    console.log(this.currentUser)
   this.commentId = this.route.snapshot.params['id']
   this.getComments()
  }
  currentUser: any;

   ticketCommentForm = this.formBuilder.group({
      commentedBy: [''],
      comment: ['', Validators.required],
      ticketId :[],
      // userId:[]
    });

comments:any;
getComments(){
  this.adminService.getComment().subscribe((res)=>{
    this.comments = res
    console.log(this.comments)
  })
}
  onSubmit(): void {
    this.isEditMode = false;
    console.log(this.ticketCommentForm.getRawValue())
    let data =
    {
      commentedBy:this.currentUser,
      comment:this.ticketCommentForm.get('comment')?.value,
      ticketId:this.route.snapshot.params['id']

    }
    console.log(data)
    this.adminService.addComment(data).subscribe((res)=>{

      this.getComments()
      console.log(res)

      this._snackbar.open('Response Submitted successfully....', '', { duration: 3000 });
      this.clearControls()
    })
    this.isEdit = false

}
clearControls(){
  this.ticketCommentForm.reset()
  this.ticketCommentForm.setErrors(null)
  //Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key).setErrors(null)})
  this.getComments()
}

  // comment!: TicketComment;
commentId:any | undefined;
commentees : TicketComment[]=[]
editFunction(id : any){
  this.isEdit = true
  this.commentId = id;
  this.adminService.getCommentById(this.commentId).subscribe((res)=>{
   let commentees = res
    console.log(commentees)
    //populate the object with the comment
    let commentedBy = commentees.commentedBy.toString()
    let comment = commentees.comment.toString()


    this.ticketCommentForm.patchValue({
      comment: comment,
      commentedBy: commentedBy,

    })


  })

}
isEdit = false
edit(){

let data ={
  comment : this.ticketCommentForm.get('comment')?.value,
  commentedBy : this.ticketCommentForm.get('commentedBy')?.value,
  ticketId : this.ticketCommentForm.get('ticketId')?.value
}
this.adminService.updateComment(this.commentId,data).subscribe((res)=>{
  this.getComments()
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
    // Perform deletion logic here
    this.adminService.deleteComment(id).subscribe((res)=>{
      this._snackbar.open("Project deleted successfully...","" ,{duration:3000})
      this.getComments()
    },(error=>{
      console.log(error)
      this._snackbar.open(error.error.message,"" ,{duration:3000})
    }))
  }
});


}
}


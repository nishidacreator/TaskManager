import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Project } from '../../../Models/project';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from '../../../../../Shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-manage',
  templateUrl: './client-manage.component.html',
  styleUrls: ['./client-manage.component.scss']
})
export class ClientManageComponent {
  constructor(public dialog: MatDialog, private route:ActivatedRoute, private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar){}

  clientForm = this.fb.group({
    clientName:['', Validators.required],
    mob: ['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email: ['', Validators.email]
  });

  ngOnInit(): void {
    this.getClients()
  }
  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe()
  }
  private clientSubscription: Subscription = new Subscription();
  displayedColumns : string[] = ['clientName','mob', 'email','action']

  onSubmit(){
    console.log(this.clientForm.getRawValue())
    let data ={
      clientName: this.clientForm.get('clientName')?.value,
      mob :this.clientForm.get('mob')?.value,
      email:this.clientForm.get('email')?.value,
    }
    this.clientSubscription = this.adminService.addClient(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Client added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }

  clients: any;
  getClients(){
    this.clientSubscription = this.adminService.getClients().subscribe((res)=>{
      this.clients = res
      console.log(this.clients)
    })
  }

  clientId: any;
  isEdit = false;
  editClient(id: any){
    this.isEdit = true;
    this.clientId = id
    console.log('clientId'+this.clientId)
    // console.log('clientIddd'+this.clientId)
    this.adminService.getClientById(this.clientId).subscribe(res =>{
      let client = res

      //  Populate the object by the ID
      let clientName: any = client.clientName
      let mob: any = client.mob
      let email: any = client.email

      this.clientForm.patchValue({clientName : clientName, mob : mob, email: email})
    })

  }

  editFunction(){
    this.isEdit = false;
   let data: any ={
    clientName : this.clientForm.get('clientName')?.value,
    mob : this.clientForm.get('mob')?.value,
    email:this.clientForm.get('email')?.value,
    }
    console.log('data'+data.clientName)
    console.log('Id'+this.clientId)
    this.adminService.updateClient(this.clientId, data).subscribe((res)=>{
      this._snackBar.open("Client updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }
  deleteClient(id: any){
    console.log('id'+id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.adminService.deleteClient(id).subscribe((res)=>{
          this._snackBar.open("Client deleted successfully...","" ,{duration:3000})
          this.getClients()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }
  clearControls(){
    this.clientForm.reset()
    this.clientForm.setErrors(null)
    this.getClients()
  }
}

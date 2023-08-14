import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private _snackBar: MatSnackBar){}

  ngOnDestroy() {
    // this.submitSub.unsubscribe()
    this.editSub.unsubscribe()
  }

  ngOnInit() {
    this.editRole()
  }

  roleForm = this.fb.group({
    roleName: ['', Validators.required],
    status: []
  });

  roleId : any;
  editSub!: Subscription;
  editRole(){
    //Get the product based on the ID
    this.roleId = this.route.snapshot.params['id']
    this.editSub = this.authService.getRoleById(this.roleId).subscribe(res =>{
      let role = res

      //  Populate the object by the ID
      let roleName = role.roleName.toString();
      let status: any = role.status

      this.roleForm.patchValue({roleName : roleName, status : status})
    })
  }

  onSubmit(){
    let data: any ={
      roleName : this.roleForm.get('roleName')?.value,
      status : this.roleForm.get('status')?.value
    }

    this.authService.updateRole(this.roleId, data).subscribe((res)=>{
      this._snackBar.open("Role updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }

  clearControls(){
    this.roleForm.reset()
    this.roleForm.setErrors(null)
    Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key)?.setErrors(null)})
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnDestroy() {
    // this.submitSub.unsubscribe()
  }

  ngOnInit() {}

  roleForm = this.fb.group({
    roleName: ['', Validators.required],
    status: ['']
  });

  submitSub!: Subscription;
  onSubmit(){
    console.log(this.roleForm.getRawValue())
    this.submitSub = this.authService.addRole(this.roleForm.getRawValue()).subscribe((res)=>{
      this.clearControls()
    })
  }

  clearControls(){
    this.roleForm.reset()
    this.roleForm.setErrors(null)
    Object.keys(this.roleForm.controls).forEach(key=>{this.roleForm.get(key)?.setErrors(null)})
  }
}

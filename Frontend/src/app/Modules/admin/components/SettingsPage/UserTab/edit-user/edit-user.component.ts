import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Role } from 'src/app/Modules/auth/Model/role';
import { User } from 'src/app/Modules/auth/Model/user';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roleId: ['', Validators.required],
    qualification: ['', Validators.required],
    joiningDate: [''],
    dateOfBirth: ['']
  });

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  userId: number;
  constructor(private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userId = user.id
  }

  ngOnInit() {
    this.userSub = this.getUserById()
    this.getRole()
    // this.editUser()
  }

  role$!: Observable<Role[]>;
  getRole(){
    this.role$ = this.authService.getRole()
  }

  addRole(){

  }

  userSub!: Subscription;
  user!: User
  empId!: string;
  getUserById(){
    return this.authService.getUserById(this.route.snapshot.params['id']).subscribe((res)=>{
      this.user = res;
      console.log(this.user)
      this.empId = this.user.employeeId;

      let name = this.user.name.toString();
      let phoneNumber = this.user.phoneNumber.toString();
      let email = this.user.email.toString();
      let roleId = this.user.role.id
      let qualification = this.user.qualification.toString();
      let joiningDate: any = this.user.joiningDate
      let dateOfBirth:any = this.user.dateOfBirth
      // let employeeId = this.user.employeeId.toString();

      this.userForm.patchValue({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        roleId: roleId,
        qualification: qualification,
        joiningDate: joiningDate,
        dateOfBirth: dateOfBirth
        // employeeId: employeeId
      })
    })
  }

  onSubmit(){
    let data ={
      name: this.userForm.get('name')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      email: this.userForm.get('email')?.value,
      roleId: this.userForm.get('roleId')?.value,
      qualification: this.userForm.get('qualification')?.value,
      joiningDate: this.userForm.get('joiningDate')?.value,
      employeeId: this.empId,
      password: this.userForm.get('password')?.value,
      dateOfBirth: this.userForm.get('dateOfBirth')?.value
    }

    this.authService.updateUser(this.route.snapshot.params['id'], data).subscribe((res)=>{
      console.log(res);
      this.clearControls()
    })
  }

  clearControls(){
    this.userForm.reset()
    this.userForm.setErrors(null)
    Object.keys(this.userForm.controls).forEach(key=>{this.userForm.get(key)?.setErrors(null)})
  }
}

import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Trainee } from 'src/app/Modules/admin/Models/trainee';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Role } from 'src/app/Modules/auth/Model/role';
import { User } from 'src/app/Modules/auth/Model/user';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-edit-trainee',
  templateUrl: './edit-trainee.component.html',
  styleUrls: ['./edit-trainee.component.scss']
})
export class EditTraineeComponent {
  userForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    qualification: ['', Validators.required],
    dateOfBirth: [''],
    trainingMode: [''],
    trainingPeriod: ['']
  });

  ngOnDestroy() {
    this.traineeSub.unsubscribe()
  }

  modes =[
    {name:'Free'},
    {name:'Payed'}
  ];

  periods =[
    {name:'1 Months'},
    {name:'2 Months'},
    {name:'3 Months'},
    {name:'4 Months'},
    {name:'5 Months'},
    {name:'6 Months'}
  ];

  userId: number;
  constructor(private adminService: AdminService, private route: ActivatedRoute, private fb: FormBuilder){
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    console.log(user)
    this.userId = user.id
  }

  ngOnInit() {
    this.traineeSub = this.getTraineeById()
    // this.editUser()
  }


  traineeSub!: Subscription;
  trainee!: Trainee
  empId!: string;
  getTraineeById(){
    return this.adminService.getTraineeById(this.route.snapshot.params['id']).subscribe((res)=>{
      this.trainee = res;
      console.log(this.trainee)
      this.empId = this.trainee.traineeID;;

      let name = this.trainee.name.toString();
      let phoneNumber = this.trainee.phoneNumber.toString();
      let email = this.trainee.email.toString();
      let qualification = this.trainee.qualification.toString();
      let dateOfBirth: any = this.trainee.dateOfBirth
      let trainingMode = this.trainee.trainingMode
      let trainingPeriod = this.trainee.trainingPeriod
      // let employeeId = this.user.employeeId.toString();

      this.userForm.patchValue({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        qualification: qualification,
        dateOfBirth: dateOfBirth,
        trainingMode: trainingMode,
        trainingPeriod: trainingPeriod
        // employeeId: employeeId
      })
    })
  }

  onSubmit(){
    let data ={
      name: this.userForm.get('name')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      email: this.userForm.get('email')?.value,
      qualification: this.userForm.get('qualification')?.value,
      dateOfBirth: this.userForm.get('dateOfBirth')?.value,
      password: this.userForm.get('password')?.value,
      trainingMode: this.userForm.get('trainingMode')?.value,
      trainingPeriod: this.userForm.get('trainingPeriod')?.value
    }

    this.adminService.updatetrainee(this.route.snapshot.params['id'], data).subscribe((res)=>{
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

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, pipe } from 'rxjs';
import { Attendance } from '../../Model/attendance';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder , private router:Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  })

  token : any
  submit(){
    this.authService.login(this.loginForm.getRawValue()).subscribe((res)=>{
      this.token = res
      if(this.token){
        this.setCurrentUser()
      }
    })
    //alert("Email or password is in correct")
  }

  datePipe = new DatePipe('en-US')
  setCurrentUser(){
    if(localStorage.getItem('token')){
      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      console.log(user)
      let roleid = user.role

      this.authService.getRoleById(roleid).subscribe((res)=>{
        console.log(res);

        let role = res.roleName.toLowerCase();
        console.log(role);

        if(role.toLowerCase() != 'trainee'){
          this.authService.getAttendance().pipe(
            map((x : Attendance[]) => x.filter((y) =>
              this.datePipe.transform(y.dateTime, 'yyyy-MM-dd') == this.datePipe.transform(new Date(), 'yyyy-MM-dd') &&
              y.type.toLowerCase() == 'login' &&
              y.userId === user.id
            ))
          ).subscribe((res)=>{
            let attn = res
            console.log(attn)
            if(attn.length == 0){
               // ATTENDANCE
              let data = {
                userId: user.id,
                type: 'LogIn',
                dateTime: new Date()
              }
              console.log(data)
              this.authService.addAttendance(data).subscribe((res)=>{
                console.log(res)
                this._snackBar.open("Attendance added successfully...","" ,{duration:3000})
              })
            }
            // else(
            //   alert("Attendance is already marked")
            // )
          })
        }
        else{
          this.authService.getAttendance().pipe(
            map((x : Attendance[]) => x.filter((y) =>
              this.datePipe.transform(y.dateTime, 'yyyy-MM-dd') == this.datePipe.transform(new Date(), 'yyyy-MM-dd') &&
              y.type.toLowerCase()=='login' &&
              y.traineeId === user.id
            ))
          ).subscribe((res)=>{
            let attn = res
            console.log(attn)
            if(attn.length == 0){
               // ATTENDANCE
              let data = {
                traineeId: user.id,
                type: 'LogIn',
                dateTime:  new Date()
              }
              console.log(data)
              this.authService.addAttendance(data).subscribe((res)=>{
                this._snackBar.open("Attendance added successfully...","" ,{duration:3000})
              })
            }
            // else(
            //   alert("Attendance is already marked")
            // )
          })
        }
        this.router.navigate([role]);
      })
      // alert("Welcome" + user.name)
    }
  }

  // setCurrentUser(){
  //   if(localStorage.getItem('token')){
  //     const token: any = localStorage.getItem('token')
  //     let user = JSON.parse(token)
  //     console.log(user)
  //     // this._http.setCurrentUser(user)
  //     let roleid = user.role
  //     this.authService.getRoleById(roleid).subscribe((res)=>{
  //       let role = res.roleName.toLowerCase();
  //       this.router.navigate([role]);
  //     })

  //   }
  // }

  ngOnInit(): void {
  }
}

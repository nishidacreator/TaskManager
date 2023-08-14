import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { Minutes } from '../../../Models/minutes';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { Project } from '../../../Models/project';
import { User } from 'src/app/Modules/auth/Model/user';
import { Trainee } from '../../../Models/trainee';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.scss']
})
export class MinutesOfMeetingComponent {
  ngOnDestroy(){
    // this.userSub.unsubscribe();
  }
  userId!: number
  currentUser: any;
  constructor(private formBuilder: FormBuilder,private adminService : AdminService, private authService: AuthService,
    private router: Router) {
    const token: any = localStorage.getItem('token')
    let user = JSON.parse(token)
    this.currentUser = user.name
    this.userId = user.id
  }

  ngOnInit() {
    this.getProject();
    this.getUsers();
  }


  meetingForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      projectId:['', Validators.required],
      atendees: [''],
      agenda: [''],
      minutes: [''],
      userId:['']
  })

  projects$! : Observable<Project[]>
  getProject(){
    this.projects$ = this.adminService.getProject()
    console.log(this.projects$)
  }

  users: any[] = [];
  userSub!: Subscription;
  getUsers(){
    this.userSub = combineLatest(
      this.authService.getUser(), // Observable emitting user data
      this.adminService.getTrainee().pipe(
        map((x: Trainee[]) =>
          x.filter((y) => y.status.toLowerCase() === 'joined')
        )
      ) // Observable emitting an array of Trainees with 'joined' status
    ).subscribe(([user, joinedTrainees]) => {
      this.users = [...user, ...joinedTrainees]
      console.log(this.users)
    });
  }

  onSubmit(): void {
  console.log(this.meetingForm.getRawValue())
  let data = {
      date : this.meetingForm.get('date')?.value,
      time: this.meetingForm.get('time')?.value,
      projectId:this.meetingForm.get('projectId')?.value,
      atendees: this.meetingForm.get('atendees')?.value,
      agenda: this.meetingForm.get('agenda')?.value,
      minutes: this.meetingForm.get('minutes')?.value,
      userId: this.userId,
      minuteDetails :this.minutesDetailsForm.getRawValue().details
  }
  console.log(data)
  this.adminService.addMinutes(data).subscribe((res)=>{
    console.log(res)
      this.clearControls()
    })
  }

  clearControls(){
    this.meetingForm.reset()
    this.meetingForm.setErrors(null)
    Object.keys(this.meetingForm.controls).forEach(key=>{this.meetingForm.get(key)?.setErrors(null)})

    this.minutesDetailsForm.reset()
    this.minutesDetailsForm.setErrors(null)
    Object.keys(this.minutesDetailsForm.controls).forEach(key=>{this.minutesDetailsForm.get(key)?.setErrors(null)})
  }

  details() : FormArray {
    return this.minutesDetailsForm.get("details") as FormArray
  }

  minutesDetailsForm= this.formBuilder.group({
    details : this.formBuilder.array([])
  })

  newDetails(): FormGroup {
    return this.formBuilder.group({
      description: ['', Validators.required],
    })
  }

  addMinute() {
    this.details().push(this.newDetails());
  }


  removeMinute(i:number) {
    this.details().removeAt(i);
  }

  viewMinutes(){
    this.router.navigateByUrl('admin/minutes/viewminutes')
  }


}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { User } from 'src/app/Modules/auth/Model/user';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { AdminService } from '../../../admin.service';
import { Minutes } from '../../../Models/minutes';
import { Trainee } from '../../../Models/trainee';

@Component({
  selector: 'app-view-minutes',
  templateUrl: './view-minutes.component.html',
  styleUrls: ['./view-minutes.component.scss']
})
export class ViewMinutesComponent {
  ngOnDestroy(){
    // this.deleteSub.unsubscribe()
  }

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService, private router: Router, private dialog: MatDialog){}

  meetingForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    projectId:['', Validators.required],
    atendees: [''],
    agenda: [''],
    minutes: [''],
    userId:['']
  })

  ngOnInit(){
    this.getMinutes()
    this.getUsers()
  }

  displayedColumns : string[] = ['agenda','date', 'time','minutes','view','manage']

  minutes$!: Observable<Minutes[]>;
  getMinutes(){
    this.minutes$ = this.adminService.getMinutes()
    this.minutes$.subscribe(res=>{
      console.log(res)
    })
  }

  viewDetails(id: number){
    this.router.navigateByUrl('/admin/minutes/viewminutes/'+ id)
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

  deleteSub!: Subscription;
  deleteRow(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(id)
        this.deleteSub = this.adminService.deleteMinutes(id).subscribe((res)=>{
          this.getMinutes()
          this._snackBar.open("Minute deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  isEdit: boolean = false
  minute!: Minutes
  minuteId!: number
  projectName!: string
  user!: string
  editRow(id: number){
    this.isEdit = true;

    this.adminService.getMinutesById(id).subscribe((res)=>{
      this.minute = res
      console.log(this.minute)

      this.projectName = this.minute.project.projectName
      this.user = this.minute.user.name

      let date = this.minute.date
      let time = this.minute.time
      let atendees = this.minute.atendees
      let agenda = this.minute.agenda
      let minutes = this.minute.minutes

      this.meetingForm.patchValue({
        date: date,
        time: time,
        atendees: atendees,
        agenda: agenda,
        minutes: minutes
      })
    })
    this.minuteId = id
  }

  editFunction(){
    let data ={
      date: this.meetingForm.get('date')?.value,
      time: this.meetingForm.get('time')?.value,
      atendees: this.meetingForm.get('atendees')?.value,
      agenda: this.meetingForm.get('agenda')?.value,
      minutes: this.meetingForm.get('minutes')?.value,
      projectId: this.minute.project.id,
      userId: this.minute.user.id
    }
    console.log(data)

    this.adminService.updateMinutes(this.minuteId, data).subscribe((res)=>{
      console.log(res)
      this.clearControls()
      this.getMinutes()
    })
  }

  clearControls(){
    this.meetingForm.reset()
    this.meetingForm.setErrors(null)
    Object.keys(this.meetingForm.controls).forEach(key=>{this.meetingForm.get(key)?.setErrors(null)})
  }
}


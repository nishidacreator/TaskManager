import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { DailyReport } from '../../../Models/dailyReport';
import { Task } from '../../../Models/task';


@Component({
  selector: 'app-view-daily-report',
  templateUrl: './view-daily-report.component.html',
  styleUrls: ['./view-daily-report.component.scss']
})
export class ViewDailyReportComponent {


  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder,private adminService:AdminService, private route:ActivatedRoute, public dialog:MatDialog) { }

  displayedColumns : string[] = ['description','status', 'date']

  ngOnInit(): void {
    console.log('hiiii')
    this.getDailyReports()
    this.getTaskById()
  }


dailyReports: DailyReport[] = [];
length!: number
getDailyReports(){
  console.log(this.route.snapshot.params['id'])
  this.adminService.getDailyReports().subscribe((res)=>{
    this.dailyReports = res.filter(x=> x.taskId == this.route.snapshot.params['id'])
    console.log(this.dailyReports)
    length = this.dailyReports.length
  })
}
task!: Task
statusCom:Boolean = false
getTaskById(){

  console.log(this.route.snapshot.params['id'])
  this.adminService.getTaskById(this.route.snapshot.params['id']).subscribe((res)=>{
    this.task = res
    console.log(this.task.status)

    if(this.task.status==="Completed"){
      console.log('hello')
      this.statusCom = true
    }
  })
}

closeTask(){
  let data2 ={
    status:'Closed',
  }
  console.log(data2)
  this.adminService.updateTaskStatus(data2,this.route.snapshot.paramMap.get('id')).subscribe((res)=>{
    console.log(res)
    // this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
    // this.clearControls()
    // this.getDailyReports()
  },(error=>{
    console.log(error)
    alert(error)
  }))

}
reassignFunction(){
  let data2 ={
    status:'Reassigned',
  }
  console.log(data2)
  this.adminService.updateTaskStatus(data2,this.route.snapshot.paramMap.get('id')).subscribe((res)=>{
    console.log(res)
    // this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
    // this.clearControls()
    // this.getDailyReports()
  },(error=>{
    console.log(error)
    alert(error)
  }))

}
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DailyReport } from '../../../Models/dailyReport';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { Task } from '../../../Models/task';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent {


  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder,private adminService:AdminService, private route:ActivatedRoute, public dialog:MatDialog) { }

  panelOpenState = false;


  displayedColumns : string[] = ['description','status', 'date', 'action']



  ngOnInit(): void {
    this.getDailyReports()
    this.getTaskById()
  }
  dailyReportForm = this.fb.group({


    taskId:[''],
    description:[''],
    status:[''],
    date:['']
});

task!:Task
getTaskById(){
  this.adminService.getTaskById(this.route.snapshot.params['id']).subscribe(data=>{
    this.task = data
  })
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


  getCompanyInfo(){

    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);

  }


  status = [
    {name: 'Opened'},
    {name: 'On progress'},
    {name: 'Completed'},
  ]
  onSubmit(){

    console.log(this.dailyReportForm.getRawValue())
    // console.log(this.rfqDetailsForm.get('rfqId')?.value)

    let data = {
      taskId:this.route.snapshot.paramMap.get('id'),
      description:this.dailyReportForm.get('description')?.value,
      status:'Progress',
      date:Date.now()
    }
    console.log(data)
    this.adminService.addDailyReort(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
      this.clearControls()
      this.getDailyReports()
    },(error=>{
      console.log(error)
      alert(error)
    }))
    let data2 ={
      status:'Progress',
    }
    console.log(data2)
    this.adminService.updateTaskStatus(data2,this.route.snapshot.paramMap.get('id')).subscribe((res)=>{
      console.log(res)
      // this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
      this.clearControls()
      // this.getDailyReports()
    },(error=>{
      console.log(error)
      alert(error)
    }))



  }

  dailyReportId: any;
  isEdit = false;
  editDailyReport(id: any){
    this.isEdit = true;
    this.dailyReportId = id
    console.log('dailyReportId'+this.dailyReportId)
    this.adminService.getdailyReportById(this.dailyReportId).subscribe(res =>{
      let dailyReport = res

      //  Populate the object by the ID
      let status: any = dailyReport.status
      let description: any = dailyReport.description
      this.dailyReportForm.patchValue({description : description, status: status})
    })
    // console.log('clientform'+this.clientId.clientName)

  }

  editFunction(){
    this.isEdit = false;
   let data: any ={
    description : this.dailyReportForm.get('description')?.value,
    status : this.dailyReportForm.get('status')?.value
    }
    console.log('data'+data.description)
    console.log('Iddd'+this.dailyReportId)
    this.adminService.editDailyReport(this.dailyReportId, data).subscribe((res)=>{
      this._snackBar.open("Daily Report updated successfully...","" ,{duration:3000})
      this.clearControls();
    },(error=>{
          alert(error.message)
        }))
  }
  deleteDailyReport(id: any){
    console.log('id'+id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.adminService.deleteDailyReport(id).subscribe((res)=>{
          this._snackBar.open("Daily report deleted successfully...","" ,{duration:3000})
          this.getDailyReports()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }

  completeFunction(){
    console.log(this.dailyReportForm.getRawValue())
    // console.log(this.rfqDetailsForm.get('rfqId')?.value)

    let data = {
      taskId:this.route.snapshot.paramMap.get('id'),
      description:this.dailyReportForm.get('description')?.value,
      status:'Completed',
      date:Date.now()
    }
    console.log(data)
    this.adminService.addDailyReort(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
      this.clearControls()
      this.getDailyReports()
    },(error=>{
      console.log(error)
      alert(error)
    }))
    let data1 ={
      status:'Completed',
    }
    console.log(data1)
    this.adminService.updateTaskStatus(data1,this.route.snapshot.paramMap.get('id')).subscribe((res)=>{
      console.log(res)
      // this._snackBar.open("Daily report added successfully...","" ,{duration:3000})
      this.clearControls()
      // this.getDailyReports()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }

  clearControls(){
    this.dailyReportForm.reset()
    this.dailyReportForm.setErrors(null)
    this.getDailyReports()
  }
}

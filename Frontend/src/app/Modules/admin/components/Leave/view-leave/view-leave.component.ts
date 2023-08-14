import { Leave } from './../../../../employee/Model/leave';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { LeaveManagementComponent } from 'src/app/Modules/employee/Components/leave-management/leave-management.component';
import { EmergencyLeaveComponent } from '../emergency-leave/emergency-leave.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/Modules/employee/employee.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.scss']
})
export class ViewLeaveComponent {
    // leaveRequestForm!: FormGroup;

    calendarEvents: EventInput[] = [];
    @ViewChild('fullcalendar', { static: true }) fullcalendar: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.calendarEvents, // Placeholder for initial events
    eventDidMount: this.eventDidMount,
    displayEventTime: false
  };

  eventDidMount(info: any) {
    // Customize the background color of the event
    info.el.style.backgroundColor = info.event.backgroundColor;
    info.el.style.borderColor = info.event.borderColor;
    info.el.style.color = info.event.color;
  }

  fromDate : any;
  toDate : any;
  clientName : any;


    displayedColumns : string[] = ['userId','leaveType','reason','fromDate', 'toDate', 'status','action']

    userId!: number
    constructor(private formBuilder: FormBuilder, private adminService: AdminService, private authService: AuthService,
      private dialog: MatDialog, private empService: EmployeeService, private _snackBar: MatSnackBar) {
      const token: any = localStorage.getItem('token')
        let user = JSON.parse(token)
        console.log(user)
        this.userId = user.id
        console.log(this.userId)
     }

    ngOnInit() {
      this.getLeaveList()
    }

    leaves: Leave[] = [];
    getLeaveList(){
      this.adminService.getLeaveList().subscribe((res)=>{
        this.leaves = res
        console.log(this.leaves)
        const leaves = res.filter(e=>e.status.toLowerCase() === 'approved' )

        this.calendarEvents = leaves.map(event => ({
          title: event.user.name,
          start: event.fromDate,
          end: event.toDate,
          backgroundColor: 'green',
          borderColor: 'green',
          color: 'white'
        }));
        this.renderCalendarEvents();

        const emergencyLeave = this.leaves.filter(e=>e.status.toLowerCase() === 'emergency' )
        const emergencyEvents = emergencyLeave.map(event => ({
          title: event.user.name,
          start: event.fromDate,
          end: event.toDate,
          backgroundColor: 'red',
          borderColor: 'red',
          color: 'white'
        }));
        this.calendarEvents = this.calendarEvents.concat(emergencyEvents);
        this.renderCalendarEvents();
      }, error => {
        console.error('Error fetching leaves from MongoDB:', error);
      });
    }

    getEmergencyLeave(){

    }

    renderCalendarEvents() {
      const calendarApi = this.fullcalendar.getApi();
      calendarApi.removeAllEvents(); // Clear existing events from the calendar
      for (let i = 0; i < this.calendarEvents.length; i++) {
        calendarApi.addEvent(this.calendarEvents[i]);
      }
    }

    approveLeave(id: any){
      console.log(id)
      let data: any ={
        status : 'Approved'
      }
      console.log(data.status)
      this.adminService.UpdateLeaveById(id,data).subscribe(res =>{
        let task = res
        this.getLeaveList()
        this.getEmergencyLeave()
        console.log(task)
    })
  }
    rejectLeave(id: any){
      console.log(id)
      let data: any ={
        status : 'Rejected'
        }
      console.log(data.status)
      this.adminService.UpdateLeaveById(id,data).subscribe(res =>{
        let task = res
        this.getLeaveList()
        this.getEmergencyLeave
        console.log(task)

    })
   }

  addEmergency(){
    const dialogRef = this.dialog.open(EmergencyLeaveComponent, {
      data: {
        status: this.isEdit
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
          this.getLeaveList()
          this.getEmergencyLeave()
      }
    });
  }

  isEdit = false;
  editRow(id: number){
    this.isEdit = true;
    const dialogRef = this.dialog.open(EmergencyLeaveComponent, {
      data: {
        status: true,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
          this.getLeaveList()
          this.getEmergencyLeave()
      }
    });
  }

  deleteRow(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '440px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Perform deletion logic here
        this.empService.deleteLeave(id).subscribe((res)=>{
          this._snackBar.open("Leave deleted successfully...","" ,{duration:3000})
          this.getLeaveList()
          this.getEmergencyLeave()
        },(error=>{
          console.log(error)
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    });
  }
}

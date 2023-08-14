import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {
  updateRole: boolean = false;
  role(){
    this.updateRole = true;
    this.updateUser = false;
    this.updateAttendance = false;
    this.updateTrainee = false;
  }

  updateUser: boolean = false
  user(){
    this.updateRole = false;
    this.updateUser = true;
    this.updateAttendance = false;
    this.updateTrainee = false;
  }

  updateTrainee: boolean = false
  trainee(){
    this.updateRole = false;
    this.updateUser = false;
    this.updateAttendance = false;
    this.updateTrainee = true;
  }

  updateAttendance: boolean = false
  attendance(){
    this.updateRole = false;
    this.updateUser = false;
    this.updateAttendance = true;
    this.updateTrainee = false;
  }
}

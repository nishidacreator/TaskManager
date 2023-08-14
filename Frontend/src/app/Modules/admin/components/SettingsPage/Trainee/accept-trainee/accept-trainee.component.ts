import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';

@Component({
  selector: 'app-accept-trainee',
  templateUrl: './accept-trainee.component.html',
  styleUrls: ['./accept-trainee.component.scss']
})
export class AcceptTraineeComponent {
  constructor(
    public dialogRef: MatDialogRef<AcceptTraineeComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
     private fb: FormBuilder, private adminService: AdminService) {}

  traineeForm = this.fb.group({
    traineeID: ['', Validators.required],
    trainingMode: ['', Validators.required],
    trainingPeriod: ['', Validators.required]
  });

  ngOnInit(): void {
    this.generateEmployeeId()
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  employees!: any[] ;
  userSub!: Subscription
  employeeId: string = '';
  generateEmployeeId() {
    this.userSub = this.adminService.getTrainee().subscribe((res)=>{
      this.employees = res.filter(e=>e.status.toLowerCase() === 'joined')
      console.log(this.employees)

       // Check if there are any employees in the array
      console.log(this.employees)
      if (this.employees.length > 0) {
        const maxId = this.employees.reduce((prevMax, emp) => {
          // Extract the numeric part of the employee ID and convert it to a number
          const idNumber = parseInt(emp.traineeID.substring(3), 10);

          // Check if the extracted numeric part is a valid number
          if (!isNaN(idNumber)) {
            return idNumber > prevMax ? idNumber : prevMax;
          } else {
            // If the extracted part is not a valid number, return the previous max
            return prevMax;
          }
        }, 0);
        // Increment the maxId by 1 to get the next ID
        const nextIdNumber = maxId + 1;

        // Pad the ID with leading zeros to ensure a fixed format (e.g., 'EMP001', 'EMP012', etc.)
        const paddedId = `TR${nextIdNumber.toString().padStart(3, '0')}`;

        // Set the generated employee ID to the 'employeeId' property
        this.employeeId = paddedId;
      } else {
        // If there are no employees in the array, set the employeeId to 'EMP001'
        this.employeeId = 'TR001';
      }
      this.traineeForm.get('traineeID')?.setValue(this.employeeId)
    })

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



  onSubmit(){
      let trianee = {
        traineeID: this.employeeId,
        trainingPeriod: this.traineeForm.get('trainingPeriod')?.value,
        trainingMode: this.traineeForm.get('trainingMode')?.value,
        status: 'Joined',
        startDate: new Date()
      }
      console.log(this.data.traineeId);

      this.adminService.updatetraineeStatus(this.data.traineeId, trianee).subscribe(res=>{
        console.log(res)
      })
      this.clearControls()
      this.dialogRef.close(true);
  }

  clearControls(){
    this.traineeForm.reset()
    this.traineeForm.setErrors(null)
    Object.keys(this.traineeForm.controls).forEach(key=>{this.traineeForm.get(key)?.setErrors(null)})
  }

}

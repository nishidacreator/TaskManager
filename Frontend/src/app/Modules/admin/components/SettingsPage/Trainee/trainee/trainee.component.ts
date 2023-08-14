import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Role } from 'src/app/Modules/auth/Model/role';
import { AuthService } from 'src/app/Modules/auth/auth.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.scss']
})
export class TraineeComponent {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: [''],
    phoneNumber:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    qualification: [''],
    experience: [''],
    languagesKnown: [''],
    remarks: [''],
    password: [''],
    traineeID: [''],
    trainingMode: ['', Validators.required],
    trainingPeriod: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,private _snackBar: MatSnackBar, private authService: AuthService,
    private adminService: AdminService) {
    this.filteredOptions = this.progLanguages
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
      this.form.get('traineeID')?.setValue(this.employeeId)
    })

  }

  languages = [
    {name: 'Malayalam'},
    {name: 'English'},
    {name: 'Tamil'},
    {name: 'Hindi'},
  ];

  qualification =[
    {name: 'High School Diploma'},
    {name: 'Bachelors Degree'},
    {name: 'Masters Degree'},
    {name: 'Doctorate or Ph.D'},
    {name: 'Professional Certification'},

  ];
  experience =[
    {name:'0 years'},
    {name:'1 year'},
    {name:'2 year'},
    {name:'3 year'},
    {name:'3 year plus'},
  ];

  ngOnInit(): void {
    this.getRoles()
    this.generateEmployeeId()
  }

  roleId!: any
  roleSub!: Subscription;
  getRoles(){
    this.roleSub = this.authService.getRole().subscribe((res)=>{
      this.roleId = res.find(x=> x.roleName.toLowerCase() === 'trainee')?.id
      console.log(this.roleId)
    })
  }

   //ADD MORE LANGUAGES
   languageForm = this.formBuilder.group({
    languages: this.formBuilder.array([])
  });

  language() : FormArray {
    return this.languageForm.get("languages") as FormArray
  }

  newLanguage(): FormGroup {
    return this.formBuilder.group({
      language: ['', Validators.required],
      yearOfExperience: ['', Validators.required]
    })
  }

  status: boolean = false;
  add(){
    this.status = true;
    this.language().push(this.newLanguage());
  }

  remove(i:number) {
    this.status = false;
    this.language().removeAt(i);
  }

  progLanguages = [
    {name: 'Python'},
    {name: 'Jaavacript'},
    {name: 'Go'},
    {name: 'Jaava'},
    {name: 'Kotlin'},
    {name: 'PHP'},
    {name: ' C#'},
    {name: 'Swift'},
    {name: 'R'},
    {name: 'Ruby'},
    {name: 'C and C++'},
    {name: 'Matlab'},
    {name: 'TypeScript'},
    {name: 'Scala'},
    {name: 'SQL'},
    {name: 'HTML'},
    {name: 'CSS'},
    {name: 'NoSQL'},
    {name: 'Rust'},
    {name: 'Perl'},
  ];

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

  //Search in MatSelect
  myControl = new FormControl<string | any>('');
  filteredOptions: any[] = [];
  filterOptions(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    console.log(value);

    this.filteredOptions = this.progLanguages.filter(option =>
      (option.name && option.name.toLowerCase().includes(value?.toLowerCase()))
    );
  }

  // End ADD LANGUAGE
  //

  // ADD MORE EXPERIENCES
  experienceForm = this.formBuilder.group({
    experiences: this.formBuilder.array([])
  });

  exp() : FormArray {
    return this.experienceForm.get("experiences") as FormArray
  }

  newExp(): FormGroup {
    return this.formBuilder.group({
      experience: ['', Validators.required],
      yearOfExperience: ['', Validators.required]
    })
  }

  statusExp: boolean = false;
  addExp(){
    this.statusExp = true;
    this.exp().push(this.newExp());
  }

  removeExp(i:number) {
    this.statusExp = false;
    this.exp().removeAt(i);
  }


  staff : any
  onSubmit() {
    let data = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      dateOfBirth: this.form.get('dateOfBirth')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      qualification: this.form.get('qualification')?.value,
      experience: this.form.get('experience')?.value,
      languagesKnown: this.form.get('languagesKnown')?.value,
      remarks: this.form.get('remarks')?.value,
      password: this.form.get('password')?.value,
      roleId : this.roleId,
      status: 'Joined',
      traineeID: this.form.get('traineeID')?.value,
      trainingMode: this.form.get('trainingMode')?.value,
      trainingPeriod: this.form.get('trainingPeriod')?.value,
      traineeLanguages: this.languageForm.getRawValue().languages,
      traineeExperiences: this.experienceForm.getRawValue().experiences
    }
    console.log(data)
    this.adminService.addStaff(data).subscribe((res)=>{
      console.log(res)
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
      this._snackBar.open("Submitted successfully...","" ,{duration:3000})
    }))
  }


  clearControls(){
    this.form.reset()
    this.form.setErrors(null)
    Object.keys(this.form.controls).forEach(key=>{this.form.get(key)?.setErrors(null)})

    this.languageForm.reset()
    this.languageForm.setErrors(null)
    Object.keys(this.languageForm.controls).forEach(key=>{this.languageForm.get(key)?.setErrors(null)})

    this.experienceForm.reset()
    this.experienceForm.setErrors(null)
    Object.keys(this.experienceForm.controls).forEach(key=>{this.experienceForm.get(key)?.setErrors(null)})
  }
}

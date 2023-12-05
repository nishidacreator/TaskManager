import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { User } from 'src/app/Modules/auth/Model/user';
import { Role } from 'src/app/Modules/auth/Model/role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  constructor(private fb: FormBuilder,public adminService: AdminService, private _snackBar: MatSnackBar,
    private authService: AuthService){
      this.filteredOptions = this.progLanguages
    }

  userForm = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    roleId: ['', Validators.required],
    qualification: [''],
    joiningDate: [''],
    employeeId: ['', Validators.required],
    dateOfBirth: ['']
  });

  ngOnInit(): void {
    this.getRole()
    this.generateEmployeeId()
  }

  employees: any[] = [];
  userSub!: Subscription
  employeeId: string = '';
  generateEmployeeId() {
    this.userSub = this.authService.getUser().subscribe((res)=>{
      this.employees = res
      
      if (this.employees.length > 0) {
        const maxId = this.employees.reduce((prevMax, emp) => {
          // Extract the numeric part of the employee ID and convert it to a number
          const idNumber = parseInt(emp.employeeId.substring(3), 10);

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
        const paddedId = `EMP${nextIdNumber.toString().padStart(3, '0')}`;

        // Set the generated employee ID to the 'employeeId' property
        this.employeeId = paddedId;
      } else {
        // If there are no employees in the array, set the employeeId to 'EMP001'
        this.employeeId = 'EMP001';
      }
      this.userForm.get('employeeId')?.setValue(this.employeeId)
    })

  }

  role$!: Observable<Role[]>
  getRole(){
    this.role$ = this.authService.getRole()
  }

  addRole(){

  }

  //ADD MORE LANGUAGES
  languageForm = this.fb.group({
    languages: this.fb.array([])
  });

  language() : FormArray {
    return this.languageForm.get("languages") as FormArray
  }

  newLanguage(): FormGroup {
    return this.fb.group({
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
  experienceForm = this.fb.group({
    experiences: this.fb.array([])
  });

  exp() : FormArray {
    return this.experienceForm.get("experiences") as FormArray
  }

  newExp(): FormGroup {
    return this.fb.group({
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


  onSubmit(){
    console.log(this.userForm.getRawValue())
    console.log(this.languageForm.getRawValue())
    console.log(this.experienceForm.getRawValue())

    let data ={
      status: true,
      name : this.userForm.get('name')?.value,
      joiningDate: this.userForm.get('joiningDate')?.value,
      email: this.userForm.get('email')?.value,
      phoneNumber: this.userForm.get('phoneNumber')?.value,
      password: this.userForm.get('password')?.value,
      roleId: this.userForm.get('roleId')?.value,
      qualification: this.userForm.get('qualification')?.value,
      employeeId: this.userForm.get('employeeId')?.value,
      dateOfBirth: this.userForm.get('dateOfBirth')?.value,
      userLanguages: this.languageForm.getRawValue().languages,
      userExperiences: this.experienceForm.getRawValue().experiences
    }

    console.log(data)
    this.authService.registerUser(data).subscribe((res)=>{
      console.log(res)
      this._snackBar.open("User added successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))


  }

  clearControls(){
    this.languageForm.reset()
    this.languageForm.setErrors(null)
    Object.keys(this.languageForm.controls).forEach(key=>{this.languageForm.get(key)?.setErrors(null)})

    this.experienceForm.reset()
    this.experienceForm.setErrors(null)
    Object.keys(this.experienceForm.controls).forEach(key=>{this.experienceForm.get(key)?.setErrors(null)})

    this.userForm.reset()
    this.userForm.setErrors(null)
    Object.keys(this.userForm.controls).forEach(key=>{this.userForm.get(key)?.setErrors(null)})
  }

}


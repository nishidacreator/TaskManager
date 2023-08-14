import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { RegService } from './reg.service';
import { Observable, Subscription } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'staff-registration';

  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: [''],
    phoneNumber:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    qualification: [''],
    experience: [''],
    languagesKnown: [''],
    remarks: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder,private regService:RegService, private _snackBar: MatSnackBar) {
    this.filteredOptions = this.progLanguages
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
    this.generatePassword(this.passwordLength)
    this.getRoles()
  }

  roleId!: number
  roleSub!: Subscription;
  getRoles(){
    this.roleSub = this.regService.getRole().subscribe((res)=>{
      this.roleId = res.find(r=>r.roleName.toLowerCase() == 'trainee').id
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
      password: this.generatedPassword,
      roleId : this.roleId,
      status: 'Registered',
      traineeLanguages: this.languageForm.getRawValue().languages,
      traineeExperiences: this.experienceForm.getRawValue().experiences
    }
    console.log(data)
    this.regService.addStaff(data).subscribe((res)=>{
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


  generatedPassword: string = '';
  passwordLength: number = 12; // Default password length
  async generatePassword(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    const saltRounds = 10;
    this.generatedPassword = await bcrypt.hash(password, saltRounds);
    this.form.get('password')?.setValue(this.generatedPassword)
  }
}

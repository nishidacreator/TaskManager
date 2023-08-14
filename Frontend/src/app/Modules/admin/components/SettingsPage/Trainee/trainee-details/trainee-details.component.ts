import { TraineeExperience } from './../../../../Models/traineeExperience';
import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trainee } from 'src/app/Modules/admin/Models/trainee';
import { TraineeLanguage } from 'src/app/Modules/admin/Models/traineeLanguage';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { User } from 'src/app/Modules/auth/Model/user';
import { UserExperience } from 'src/app/Modules/auth/Model/userExperience';
import { UserLanguage } from 'src/app/Modules/auth/Model/userLanguages';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { DeleteComponent } from 'src/app/Shared/delete/delete.component';

@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent {
  ngOnDestroy(){
    this.getSub.unsubscribe();
    // this.userLangSub.unsubscribe();
    // this.userExpSub.unsubscribe();
  }

  ngOnInit(){
    this.getTraineeById()
    this.getUserLanguagesByUser()
    this.getUserExperiencesByUser()
  }

  userId: number
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router,
    private dialog: MatDialog, private _snackBar: MatSnackBar, private fb: FormBuilder){
      this.filteredOptions = this.progLanguages

      const token: any = localStorage.getItem('token')
      let user = JSON.parse(token)
      console.log(user)
      this.userId = user.id
    }

  getSub!: Subscription
  trainee!: Trainee;
  getTraineeById(){
    this.getSub = this.adminService.getTraineeById(this.route.snapshot.params['id']).subscribe((res)=>{
      this.trainee = res;

      let password = this.trainee.password
    })
  }

  editRow(id:number){
    this.router.navigateByUrl('/admin/settings/edittrainee/'+ id)
  }

  userLangSub!: Subscription
  languages: TraineeLanguage[] = []
  getUserLanguagesByUser(){
    this.userLangSub = this.adminService.getTraineeLanguageByUserId(this.route.snapshot.params['id']).subscribe((res)=>{
      this.languages = res;
      console.log(res)
    })
  }
  displayedColumns : string[] = ['id','language', 'yearOfExperience', 'manage']

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
      yearOfExperience: ['', Validators.required],
      traineeId: this.route.snapshot.params['id']
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

  submitSub!: Subscription;
  onSubmitLang(){
    this.submitSub = this.adminService.addTraineeLanguage(this.languageForm.getRawValue()).subscribe((res)=>{
      console.log(res);
      this.getUserLanguagesByUser()
      this.clearControls()
      this._snackBar.open("Language added successfully...","" ,{duration:3000})
    })
  }
  // End ADD LANGUAGE
  //

  // UPDATE LANGUAGE
  editLanguageForm = this.fb.group({
    language: ['', Validators.required],
    yearOfExperience: ['', Validators.required]
  })

  editLngStat: boolean = false;
  langId!: number
  editRowLang(id: number){
    this.editLngStat = true;

    this.adminService.getTraineeLanguageById(id).subscribe((res)=>{
      let lang = res;

      let language = lang.language.toString();
      let year: any = lang.yearOfExperience;

      this.editLanguageForm.patchValue({
        language: language,
        yearOfExperience: year
      })
    })
    this.langId = id;
  }

  editLanguage(){
    console.log(this.langId)
    let data: any = {
      language : this.editLanguageForm.get('language')?.value,
      yearOfExperience : this.editLanguageForm.get('yearOfExperience')?.value,
    }
    this.adminService.updateTraineeLanguageById(this.langId, data).subscribe((res) =>{
      console.log(res);
      this._snackBar.open("Language updated successfully...","" ,{duration:3000})
      this.clearControls()
      this.getUserLanguagesByUser()
    },(error=>{
      alert(error)
    }))
  }

  deleteSub!: Subscription;
  deleteRowLang(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(id)
        this.deleteSub = this.adminService.deleteTraineeLanguage(id).subscribe((res)=>{
          this.getUserLanguagesByUser()
          this._snackBar.open("Language deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  userExpSub!: Subscription;
  experiences: TraineeExperience[] = []
  getUserExperiencesByUser(){
  this.userExpSub = this.adminService.getTraineeExperienceByUserId(this.route.snapshot.params['id']).subscribe((res)=>{
      this.experiences =res;
      console.log(res)
    })
  }
  displayedColumnsExp : string[] = ['id','experience', 'yearOfExperience', 'manage']


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
      yearOfExperience: ['', Validators.required],
      traineeId: this.route.snapshot.params['id']
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

  submitExpSub!: Subscription;
  onSubmitExp(){
    console.log(this.experienceForm.getRawValue())
    this.submitExpSub = this.adminService.addTraineeExperience(this.experienceForm.getRawValue()).subscribe((res)=>{
      this._snackBar.open("Experience added successfully...","" ,{duration:3000})
      this.getUserExperiencesByUser()
      this.clearControls()
    })
  }

  // End More experiences

  // UPDATE EXPERIENCE
  editExperienceForm = this.fb.group({
    experience: ['', Validators.required],
    yearOfExperience: ['', Validators.required]
  })


  editExpStat: boolean = false
  expId : number = 0;
  editRowExp(id: number){
    this.editExpStat = true;

    this.adminService.getTraineeExperienceById(id).subscribe((res)=>{
      let ex = res;
      console.log(ex)

      let exp = ex.experience?.toString();
      let year: any = ex.yearOfExperience;

      this.editExperienceForm.patchValue({
        experience: exp,
        yearOfExperience: year
      })
    })
    this.expId = id;
  }

  editExp(){
    let data: any = {
      experience : this.editExperienceForm.get('experience')?.value,
      yearOfExperience : this.editExperienceForm.get('yearOfExperience')?.value,
    }
    this.adminService.updateTraineeExpById(this.expId, data).subscribe((res) =>{
      console.log(res);
      this._snackBar.open("Experience updated successfully...","" ,{duration:3000})
      this.clearControls()
      this.getUserExperiencesByUser()
    },(error=>{
      alert(error)
    }))
  }

  deleteRowExp(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(id)
        this.deleteSub = this.adminService.deleteTrsineeExp(id).subscribe((res)=>{
          this.getUserExperiencesByUser()
          this._snackBar.open("Experience deleted successfully...","" ,{duration:3000})
        },(error=>{
          this._snackBar.open(error.error.message,"" ,{duration:3000})
        }))
      }
    })
  }

  clearControls(){
    this.languageForm.reset()
    this.languageForm.setErrors(null)
    Object.keys(this.languageForm.controls).forEach(key=>{this.languageForm.get(key)?.setErrors(null)})

    this.experienceForm.reset()
    this.experienceForm.setErrors(null)
    Object.keys(this.experienceForm.controls).forEach(key=>{this.experienceForm.get(key)?.setErrors(null)})

    this.editLanguageForm.reset()
    this.editLanguageForm.setErrors(null)
    Object.keys(this.editLanguageForm.controls).forEach(key=>{this.editLanguageForm.get(key)?.setErrors(null)})

    this.editExperienceForm.reset()
    this.editExperienceForm.setErrors(null)
    Object.keys(this.editExperienceForm.controls).forEach(key=>{this.editExperienceForm.get(key)?.setErrors(null)})
  }

}

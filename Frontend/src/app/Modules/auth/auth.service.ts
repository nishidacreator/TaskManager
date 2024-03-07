import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, tap, mapTo, catchError, of } from 'rxjs';
import { Role } from './Model/role';
import { User } from './Model/user';
import { UserLanguage } from './Model/userLanguages';
import { UserExperience } from './Model/userExperience';
import { Attendance } from './Model/attendance';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url = 'http://localhost:8000'
  // url = 'https://api.carvingsoft.com'

  private readonly token = 'token'
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private loggedUser: any

  constructor(private _http:HttpClient) { }

  //ROLE
  addRole(data: any){
    return this._http.post(this.url +'/role', data)
  }

  getRole():Observable<Role[]>{
    return this._http.get<Role[]>(this.url + '/role')
  }

  getRoleById(id: number):Observable<Role>{
    return this._http.get<Role>(this.url + '/role/'+ id)
  }

  deleteRole(id: number){
    return this._http.delete(this.url +'/role/' + id)
  }

  updateRole(id: number, data: any):Observable<Role>{
    return this._http.patch<Role>(this.url +'/role/' + id, data)
  }

  //USER

  registerUser(data : any){
    return this._http.post(this.url + '/register', data)
  }

  getUser():Observable<User[]>{
    return this._http.get<User[]>(this.url + '/register')
  }

  getUserById(id : number):Observable<User>{
    return this._http.get<User>(this.url + '/register/'+ id)
  }

  deleteUser(id : number){
    return this._http.delete(this.url + '/register/'+ id)
  }

  updateUser(id : number, data: any): Observable<User>{
    return this._http.patch<User>(this.url + '/register/'+ id, data)
  }

  // USER LANGUAGES
  addUserLanguage(data: any){
    return this._http.post(this.url + '/language', data)
  }

  getUserLanguageByUserId(id: number):Observable<UserLanguage[]>{
    return this._http.get<UserLanguage[]>(this.url + '/language/byuser/'+ id)
  }

  getUserLanguageById(id: number):Observable<UserLanguage>{
    return this._http.get<UserLanguage>(this.url + '/language/'+ id)
  }

  deleteUserLanguage(id: number){
    return this._http.delete(this.url + '/language/' + id);
  }

  updateUserLanguageById(id: number, data: any):Observable<UserLanguage>{
    return this._http.patch<UserLanguage>(this.url + '/language/'+ id, data)
  }

  //USER EXPERIENCE
  addUserExperience(data: any){
    return this._http.post(this.url + '/experience', data)
  }
  getUserExperienceByUserId(id: number):Observable<UserExperience[]>{
    return this._http.get<UserExperience[]>(this.url + '/experience/byuser/'+ id)
  }

  getUserExperienceById(id: number):Observable<UserExperience>{
    return this._http.get<UserExperience>(this.url + '/experience/'+ id)
  }

  deleteUserExp(id: number){
    return this._http.delete(this.url + '/experience/' + id);
  }

  updateUserExpById(id: number, data: any):Observable<UserExperience>{
    return this._http.patch<UserExperience>(this.url + '/experience/'+ id, data)
  }

  login(data: any){
    return this._http.post(this.url + '/login', data)
    .pipe(
      tap((tokens) => this.doLoginUser(data.email, tokens)),
      mapTo(true),
      catchError((error: any) => {
        return of(false)
      })
    )
  }

  private doLoginUser(userName: string, tokens: any){
    this.loggedUser = userName
    this.storeTokens(tokens)
  }

  private storeTokens(tokens: any){
    console.log(tokens)
    localStorage.setItem(this.JWT_TOKEN, tokens.token.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN, tokens.token.refreshToken)
    localStorage.setItem(this.token, JSON.stringify(tokens))
  }

  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean{
    let loggedStatus = this.getJwtToken()
    console.log(loggedStatus)
    return !!this.getJwtToken();
  }

  logout(){
    // localStorage.clear()
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem("token");
  }

  //ATTENDANCE

  addAttendance(data: any){
    return this._http.post(this.url + '/attendance', data)
  }

  getAttendance():Observable<Attendance[]>{
    return this._http.get<Attendance[]>(this.url + '/attendance')
  }

  updateAttendanceByUser(id: number, data: any):Observable<Attendance>{
    return this._http.patch<Attendance>(this.url + '/attendance/' + id, data)
  }
}

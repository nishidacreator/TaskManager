import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './Models/ticket';
import { Trainee } from './Models/trainee';
import { Client } from './Models/client';
import { DailyReport } from './Models/dailyReport';
import { Project } from './Models/project';
import { Task } from './Models/task';
import { TraineeExperience } from './Models/traineeExperience';
import { TraineeLanguage } from './Models/traineeLanguage';
import { Leave } from '../employee/Model/leave';
import { Minutes } from './Models/minutes';
import { MinutesDetails } from './Models/minutesDetails';
import { TicketComment } from './Models/ticketComment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   url = 'http://localhost:8000'
  // url = 'https://api.carvingsoft.com'
  constructor(private _http:HttpClient) { }



  // TRAINEES
  addStaff(data:any){
    return  this._http.post(this.url+'/trainee', data)
  }

  getTrainee(): Observable<Trainee[]>{
    return this._http.get<Trainee[]>(this.url+'/trainee')
  }

  getTraineeById(id: number): Observable<Trainee>{
    return this._http.get<Trainee>(this.url+'/trainee/' + id)
  }

  updatetrainee(id: number, data: any): Observable<Trainee>{
    return this._http.patch<Trainee>(this.url+'/trainee/'+ id, data)
  }

  updatetraineeStatus(id: number, data: any): Observable<Trainee>{
    return this._http.patch<Trainee>(this.url+'/trainee/status/'+ id, data)
  }

  deleteTrainee(id: number){
    return this._http.delete(this.url + '/trainee/'+ id)
  }

  // TRAINEE LANGUAGES
  addTraineeLanguage(data: any){
    return this._http.post(this.url + '/traineelanguage', data)
  }

  getTraineeLanguageByUserId(id: number):Observable<TraineeLanguage[]>{
    return this._http.get<TraineeLanguage[]>(this.url + '/traineelanguage/byuser/'+ id)
  }

  getTraineeLanguageById(id: number):Observable<TraineeLanguage>{
    return this._http.get<TraineeLanguage>(this.url + '/traineelanguage/'+ id)
  }

  deleteTraineeLanguage(id: number){
    return this._http.delete(this.url + '/traineelanguage/' + id);
  }

  updateTraineeLanguageById(id: number, data: any):Observable<TraineeLanguage>{
    return this._http.patch<TraineeLanguage>(this.url + '/traineelanguage/'+ id, data)
  }

  //TRAINEE EXPERIENCE
  addTraineeExperience(data: any){
    return this._http.post(this.url + '/traineeexperience', data)
  }
  getTraineeExperienceByUserId(id: number):Observable<TraineeExperience[]>{
    return this._http.get<TraineeExperience[]>(this.url + '/traineeexperience/byuser/'+ id)
  }

  getTraineeExperienceById(id: number):Observable<TraineeExperience>{
    return this._http.get<TraineeExperience>(this.url + '/traineeexperience/'+ id)
  }

  deleteTrsineeExp(id: number){
    return this._http.delete(this.url + '/traineeexperience/' + id);
  }

  updateTraineeExpById(id: number, data: any):Observable<TraineeExperience>{
    return this._http.patch<TraineeExperience>(this.url + '/traineeexperience/'+ id, data)
  }


  // TASK
  addTask(data : any){
    return this._http.post(this.url + '/task', data)
  }

  getTask(): Observable<Task[]>{
    return this._http.get<Task[]>(this.url+'/task');
  }

  getTaskById(id: any): Observable<Task>{
    return this._http.get<Task>(this.url+ '/task/'+id)
  }

  editTask(data:any, id:any):Observable<Task>{
    return this._http.patch<Task>(this.url+'/task/'+id, data);
  }


  deleteTask(id:String){
    return this._http.delete(this.url+'/task/'+id);
  }

  updateTaskStatus(data:any, id:any):Observable<Task>{
    return this._http.patch<Task>(this.url+'/task/statusupdate/'+id, data);
  }

  // PROJECT
  addProject(data : any){
    return this._http.post(this.url + '/project', data)
  }

  getProject(): Observable<Project[]>{
    return this._http.get<Project[]>(this.url+'/project');
  }
  editProject(data:any, id:String):Observable<Project>{
    return this._http.patch<Project>(this.url+'/project/'+id, data);
  }
  deleteProject(id:any){
    return this._http.delete(this.url+'/project/'+id);
  }

  getProjectById(id: any): Observable<Project>{
    return this._http.get<Project>(this.url+ '/project/'+id)
  }

  // CLIENT
  addClient(data : any){
    return this._http.post(this.url + '/clients', data)
  }
  getClients(): Observable<Client[]>{
    return this._http.get<Client[]>(this.url+'/clients');
  }
  getClientById(id: String): Observable<Client>{
    return this._http.get<Client>(this.url+ '/clients/'+id)
  }
  updateClient(id : String, data : any, ):Observable<Client>{
    return this._http.patch<Client>(this.url + '/clients/'+id, data)
  }
  deleteClient(id:String){
    return this._http.delete(this.url+'/clients/'+id);
  }


  // getAssignedTask(): Observable<Task[]>{
  //   return this._http.get<Task[]>(this.url+'/task');
  // }

  //DAILY REPORTS

  addDailyReort(data : any){
    return this._http.post(this.url + '/dailyReport', data)
  }
  getDailyReports(): Observable<DailyReport[]>{
    return this._http.get<DailyReport[]>(this.url+'/dailyReport');
  }

  getdailyReportById(id: any): Observable<DailyReport>{
    return this._http.get<DailyReport>(this.url+ '/dailyReport/'+id)
  }
  editDailyReport(id:any, data:any):Observable<DailyReport>{
    return this._http.patch<DailyReport>(this.url+'/dailyReport/'+id, data);
  }
  deleteDailyReport(id:any){
    return this._http.delete(this.url+'/dailyReport/'+id);
  }

  //LEAVE
  getLeaveList(): Observable<Leave[]>{
    return this._http.get<Leave[]>(this.url+'/leave');
  }

  getLeaveById(id: any): Observable<Leave>{
    return this._http.get<Leave>(this.url+ '/leave/'+id)

  }
  UpdateLeaveById(id : any, data : any, ):Observable<Leave>{
    return this._http.patch<Leave>(this.url + '/leave/'+id, data)
  }

  //MINUTES
  addMinutes(data:any){
    return this._http.post(this.url+'/minutes',data)
  }

  getMinutes():Observable<Minutes[]>{
    return this._http.get<Minutes[]>(this.url+'/minutes')
  }

  updateMinutes(id: number, data: any):Observable<Minutes>{
    return this._http.patch<Minutes>(this.url+'/minutes/'+id, data)
  }

  deleteMinutes(id: number){
    return this._http.delete(this.url+'/minutes/'+id)
  }

  getMinutesById(id: number):Observable<Minutes>{
    return this._http.get<Minutes>(this.url+'/minutes/' + id)
  }

  addMinutDetails(data: any){
    return this._http.post(this.url+'/minutesdetails', data)
  }

  getMinutesDetails():Observable<MinutesDetails[]>{
    return this._http.get<MinutesDetails[]>(this.url+'/minutesdetails')
  }

  getMinutesDetailsByMinuteId(id: number):Observable<MinutesDetails[]>{
    return this._http.get<MinutesDetails[]>(this.url+'/minutesdetails/' + id)
  }

  getMinutesDetailsById(id: number):Observable<MinutesDetails>{
    return this._http.get<MinutesDetails>(this.url+'/minutesdetails/byid/' + id)
  }

  updateMinutesDetails(id: number, data: any):Observable<MinutesDetails>{
    return this._http.patch<MinutesDetails>(this.url+'/minutesdetails/' + id, data)
  }

  deleteMinutesDetails(id: number){
    return this._http.delete(this.url+'/minutesdetails/' + id)
  }
//---------------------------TICKETS -------------------------------------
  getTickets():Observable<Ticket[]>{
    return this._http.get<Ticket[]>(this.url+'/tickets')
  }

  deleteTicket(id:number){
    return this._http.delete(this.url +'/tickets/' +id)

  }
  updateTicket(id:number,data:any):Observable<Ticket>{
    return this._http.patch<Ticket>(this.url +'/tickets/'+id, data)
  }
  getTicketById(id:number):Observable<Ticket>{
    return this._http.get<Ticket>(this.url+'/tickets/'+id)
   }
editTicket(data:any, id:any):Observable<Ticket>{
  return this._http.patch<Ticket>(this.url+'/tickets/'+id, data);
}

updateTicketStatus(data:any, id:any):Observable<Task>{
  return this._http.patch<Task>(this.url+'/tickets/statusupdate/'+id, data);
}


  //-------------------------------TICKET COMMENTS---------------------------------
  addComment(data:any){
    return this._http.post(this.url+'/ticketComment', data)
  }

  getComment():Observable<TicketComment[]>{
    return this._http.get<TicketComment[]>(this.url+'/ticketComment')
  }

  getCommentById(id:number):Observable<TicketComment> {
    return this._http.get<TicketComment>(this.url+'/ticketComment/'+id)
  }

  updateComment(id: number, data: any):Observable<TicketComment>{
    return this._http.patch<TicketComment>(this.url +'/ticketComment/' + id, data)
  }

  deleteComment(id:number){
    return this._http.delete(this.url +'/ticketComment/' +id)
  }
}

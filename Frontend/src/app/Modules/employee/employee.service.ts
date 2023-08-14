import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from './Model/leave';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url = 'http://localhost:8000';

  constructor(private _http:HttpClient) { }

  createTicket(ticketData: FormData) {
    return this._http.post(this.url +'/tickets/create', ticketData);
  }

  addLeave(data:any){
    return this._http.post(this.url +'/leave', data)
  }

  getLeaveById(id: number):Observable<Leave>{
    return this._http.get<Leave>(this.url + '/leave/'+ id)
  }
  getLeaveList(): Observable<Leave[]>{
    return this._http.get<Leave[]>(this.url+'/leave');
  }
  editLeave (data : any, id : any ):Observable<Leave>{
    return this._http.patch<Leave>(this.url + '/leave/'+id, data)
  }
  deleteLeave(id: number){
    return this._http.delete(this.url+'/leave/'+id);
  }
}

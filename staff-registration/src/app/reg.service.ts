import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegService {
  url = "http://localhost:8000"
  constructor(private _http:HttpClient) { }


  addStaff(data:any){
   return  this._http.post(this.url+'/trainee', data)
  }

  getTrainee():Observable<any[]>{
    return this._http.get<any[]>(this.url+'/trainee')
  }

  getRole():Observable<any[]>{
    return this._http.get<any[]>(this.url + '/role')
  }
}

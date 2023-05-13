import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassSchedule } from '../models/class-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ClassScheduleService {

  constructor(private _http:HttpClient) { }

  url :string = "http://localhost:3000/classSchedule";
  headers = new HttpHeaders().set('Content-Type', 'application/json');  

    /**GET CLASSES */
    getClasses (): Observable<any> {
      return this._http.get<ClassSchedule[]>(this.url)
     .pipe(map((res:any)=>{
        return res;
      }))
    }
    /**POST CLASSES */
    postClasses (data:any): Observable<any> {
     return this._http.post<any>(this.url,data)
     .pipe(map((res:any)=>{
      return res;
    }))
    }
    /**PUT CLASSES */
    putClasses (data:any): Observable<any> {
      return this._http.put<any>("http://localhost:3000/classSchedule/"+data.id,data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
    /**DELETE CLASSES */
    deleteClasses (id:number): Observable<any> {
      return this._http.delete<any>("http://localhost:3000/classSchedule/"+id)
      .pipe(map((res:any)=>{
        res = 'deleted'
        return res;
      }))
    } 


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { StuffModel } from '../models/stuffModel';

@Injectable({
  providedIn: 'root'
})
export class StuffService {
 
  constructor(private _http:HttpClient) { }  
  url :string = "http://localhost:3000/stuff";
  headers = new HttpHeaders().set('Content-Type', 'application/json');  

  /**GET STAFF */
   getStuffs (): Observable<any> {
    return this._http.get<StuffModel[]>(this.url)
   .pipe(map((res:any)=>{
      return res
    }))
  }
  /**POST STAFF */
  postStuffs (data:any): Observable<any> {
   return this._http.post<any>(this.url,data)
   .pipe(map((res:any)=>{
    return res
  }))
  }
  /**PUT STAFF */
  putStuffs (data:any): Observable<any> {
    return this._http.put<any>("http://localhost:3000/stuff/"+data.id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  /**DELETE STAFF */
  deleteStuffs (id:number): Observable<any> {
    return this._http.delete<any>("http://localhost:3000/stuff/"+id)
    .pipe(map((res:any)=>{
      res = 'deleted'
      return res
    }))
  } 
}

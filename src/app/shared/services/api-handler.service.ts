import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http:HttpClient,private route:ActivatedRoute,) {};
  
   getHeader(id:string):Observable<any> {
      return this.http.get<any>(`assets/config/${id}.json`).pipe(
        map((res:any)=>{
          return res;
        }),
        catchError( (error:HttpErrorResponse)=>{
          if(error.status ===404){
            return  this.http.get<any>(`assets/config/default.json`)
          }
          return throwError(() => new Error());
        })
      )
    }
  

};

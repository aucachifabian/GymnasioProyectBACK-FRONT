import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routine } from 'src/app/models/routine/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private urlBase : string = "http://localhost:3000/api/routine/";

  //-----------------------------------------------------------//

  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createRoutine(routine : Routine) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(routine);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getRoutines() : Observable<any> {

    return this.http.get(this.urlBase);
  }

  //-----------------------------------------------------------//

  public getRoutine(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateRoutine(routine : Routine) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(routine);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteRoutine(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  //Metodo para guardar una rutina dentro del api
  saveRoutine(routine:Routine):Observable<any>{
    const httpOption={
      headers:new HttpHeaders({
        "Content-Type":"application/json"  //header de tipo de body enviado: MIME
      }),
      params: new HttpParams({})
    }

    let body=JSON.stringify(routine);
    return this.http.post(this.urlBase+"routine",body,httpOption)
  }
}

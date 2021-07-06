import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assistance } from 'src/app/models/assistance/assistance';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {
  
  private urlBase : string = "http://localhost:3000/api/assistance/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createAssistance(assistance : Assistance) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(assistance);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getAssistances() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getAssistance(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateAssistance(assistance : Assistance) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(assistance);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteAssistance(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public getAssistanceByIdStudent(id : string) : Observable<any> {

    return this.http.get(this.urlBase+"id/"+id);
  }

  //-----------------------------------------------------------//

  public getAssistanceByDay(day : number) : Observable<any> {

    return this.http.get(this.urlBase+"day/"+day);
  }

  //-----------------------------------------------------------//

  public getAssistanceByMonthly(monthly : number) : Observable<any> {

    return this.http.get(this.urlBase+"monthly/"+monthly);
  }
  
}

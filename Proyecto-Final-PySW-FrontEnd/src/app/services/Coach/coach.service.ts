import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from 'src/app/models/coach/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private urlBase : string = "http://localhost:3000/api/coach/";

  //-----------------------------------------------------------//

  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createCoach(coach : Coach) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(coach);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getCoachs() : Observable<any> {

    return this.http.get(this.urlBase);
  }

  //-----------------------------------------------------------//

  public getCoach(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateCoach(coach : Coach) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(coach);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteCoach(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public getCoachByDni(dni : string) : Observable<any> {

    return this.http.get(this.urlBase+"dni/"+dni);
  }

}

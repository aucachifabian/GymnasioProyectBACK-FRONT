import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
@Injectable({
  providedIn: 'root'
})
export class ArrangementService {

  private urlBase : string = "http://localhost:3000/api/arrangement/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createArrangement(arrangement : Arrangement) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(arrangement);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getArrangements() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getArrangement(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateArrangement(arrangement : Arrangement) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(arrangement);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteArrangement(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

}

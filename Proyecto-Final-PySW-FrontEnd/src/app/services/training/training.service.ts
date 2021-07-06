import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/models/training/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private urlBase : string = "http://localhost:3000/api/training/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createTraining(training : Training) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(training);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getTrainings() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getTraining(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateTraining(traininig : Training) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(traininig);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteTraining(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }
}

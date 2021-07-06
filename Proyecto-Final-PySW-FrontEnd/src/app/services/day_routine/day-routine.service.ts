import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';

@Injectable({
  providedIn: 'root'
})
export class DayRoutineService {

  private urlBase : string = "http://localhost:3000/api/day/routine/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createDayRoutine(routine : DayRoutine) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(routine);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getDayRoutines() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getDayRoutine(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateDayRoutine(routine : DayRoutine) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(routine);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteDayRoutine(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  public findDayRoutineByIntensity(intensity:String) : Observable<any> {
    return this.http.get(this.urlBase + "?intensity=" + intensity);
  }

  public findDayRoutineByArrangement(arrangement:String) : Observable<any> {
    return this.http.get(this.urlBase + "?arrangement=" + arrangement);
  }

  public findDayRoutineByArrangementAndIntensity(arrangement:String, intensity:String) : Observable<any> {
    return this.http.get(this.urlBase + "?intensity="+ intensity +"&arrangement=" + arrangement);
  }

}

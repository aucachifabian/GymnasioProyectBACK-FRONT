import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase : string = "http://localhost:3000/api/user/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createUser(user : User) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(user);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getUsers() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getUser(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateUser(user : User) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(user);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteUser(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }
}

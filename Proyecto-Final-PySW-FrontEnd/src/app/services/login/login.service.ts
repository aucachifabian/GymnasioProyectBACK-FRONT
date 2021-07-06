import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase : string = "http://localhost:3000/api/user/login/";

  //-------------------------------------------------------------//

  constructor(private http : HttpClient) { 
  }

  //-------------------------------------------------------------//

  public login(user : User) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    let body = JSON.stringify(user);

    return this.http.post(this.urlBase,body,optional);
  }

  //-------------------------------------------------------------//

  public logout() : void {
    sessionStorage.removeItem("type_user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("owner");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("surname");
  }

  //-------------------------------------------------------------//

  public isLogged() : string {
    return sessionStorage.getItem("type_user");
  }

  //-------------------------------------------------------------//

  public isOwner() : string {
    return sessionStorage.getItem("owner");
  }

  //-------------------------------------------------------------//

  public isPerson() : string {
    return (sessionStorage.getItem("surname")+" "+sessionStorage.getItem("name"));
  }

  //-------------------------------------------------------------//

  public getToken() : string {
    if( sessionStorage.getItem("token") != null ){
      return sessionStorage.getItem("token");
    }
    else {
      return "";
    }
  }
}

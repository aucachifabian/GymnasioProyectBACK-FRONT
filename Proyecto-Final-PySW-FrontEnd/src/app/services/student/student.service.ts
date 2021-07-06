import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private urlBase : string = "http://localhost:3000/api/student/";

  //-----------------------------------------------------------//

  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createStudent(student : Student) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(student);

    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getStudents() : Observable<any> {

    return this.http.get(this.urlBase);
  }

  //-----------------------------------------------------------//

  public getStudent(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updateStudent(student : Student) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(student);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deleteStudent(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public getStudentByDni(dni : string) : Observable<any> {

    return this.http.get(this.urlBase+"dni/"+dni);
  }
}

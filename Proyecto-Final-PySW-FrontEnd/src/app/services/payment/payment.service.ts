import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';
import { Payment } from 'src/app/models/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private urlBase : string = "http://localhost:3000/api/payment/";

  //-----------------------------------------------------------//
  
  constructor(private http : HttpClient) {
  }

  //-----------------------------------------------------------//

  public createPayment(paymentWork : Payment, routineDay:DayRoutine) : Observable<any> {
    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    let body = { payment : paymentWork,
                 routine : routineDay
                }
    
    return this.http.post(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public getPayments() : Observable<any> {

    return this.http.get(this.urlBase);
  } 

  //-----------------------------------------------------------//

  public getPayment(id : string) : Observable<any> {

    return this.http.get(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public updatePayment(payment : Payment) : Observable<any> {

    const optional = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }

    let body = JSON.stringify(payment);

    return this.http.put(this.urlBase,body,optional);
  }

  //-----------------------------------------------------------//

  public deletePayment(id : string) : Observable<any> {

    return this.http.delete(this.urlBase+id);
  }

  //-----------------------------------------------------------//

  public getPaymentByIdStudent(id : string) : Observable<any> {

    return this.http.get(this.urlBase+"id/"+id);
  }
}

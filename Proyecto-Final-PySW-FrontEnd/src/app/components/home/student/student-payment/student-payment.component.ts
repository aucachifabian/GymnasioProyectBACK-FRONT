import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment/payment';
import { LoginService } from 'src/app/services/login/login.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css']
})
export class StudentPaymentComponent implements OnInit {

  public payments : Array<Payment>;

  /**************************************************/

  constructor(private paymentService : PaymentService,
              private toastr : ToastrService,
              private router : Router,
              private activateRoute : ActivatedRoute,
              public loginService : LoginService) { 
  }

  /**************************************************/

  ngOnInit(): void {
    this.payments = new Array<Payment>();

    this.activateRoute.params.subscribe(
      params => {
        this.getPayment(params.id);
      }
    );
  }

  /**************************************************/

  private getPayment(id : string) : void {
    this.paymentService.getPaymentByIdStudent(id).subscribe(
      result => {
        if(result.status == "1" ){
          result.payment.forEach(element => {
            let vPayment : Payment = new Payment();

            Object.assign(vPayment,element);

            this.payments.push(vPayment);
          });
        }
        else {
          this.toastr.error(result.msg,"Error");
        }
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }
  /**************************************************/

  public back() : void {
    this.router.navigate(["student/home"]);
  }
  /**************************************************/
}

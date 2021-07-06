import { Component, OnInit } from '@angular/core';
import { AssistanceService } from 'src/app/services/assistance/assistance.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Assistance } from 'src/app/models/assistance/assistance';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { Payment } from 'src/app/models/payment/payment';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {


  public weekday : number;
  public monthly : number;
  public assistances : Array<Assistance>;
  public payments : Array<Payment>;

  public lineChartData : ChartDataSets[];
  public lineChartLabels: Label[]; 

  public lineChartOptions = { resposive: true};
  public lineChartColors: Color[] = [{
    borderColor: 'black',
    backgroundColor: 'rgba(111, 111, 111, 0.5)',
  }]
  
  public lineChartLegend = true;
  public lineChartType = 'line';

  /***************************************************/

  constructor(private asssitanceService : AssistanceService,
              private paymentService : PaymentService,
              public loginService : LoginService) { 
  }

  /***************************************************/

  ngOnInit(): void {
    this.lineChartData = new Array<ChartDataSets>();
    this.lineChartLabels = new Array<Label>();
  }

  /***************************************************/

  public searchWeekday() : void {
    this.assistances = new Array<Assistance>();

    this.asssitanceService.getAssistances().subscribe(
      result => {
        result.forEach(element => {
          let vAssistence : Assistance = new Assistance();
          Object.assign(vAssistence,element);
          this.assistances.push(vAssistence);
        });

        this.setLineChartWeekday();
        /*this.lineChartData.push(
          { label: 'Amount Student' },
        );*/
      },

      error => {
        console.log(error);
      }
    );
  }

  /***************************************************/

  private setLineChartWeekday() : void {
    let amountStudent : number = 0;

    for (let i = 1; i <= 6; i++){

      for(let j = 0; j < this.assistances.length; j++){

        if(this.assistances[j].weekday == i){
          amountStudent = amountStudent + this.assistances[j].student.length;
        }
      }

      switch(i) { 
        case 1: { this.lineChartLabels.push('Monday'); 
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}

        case 2: { this.lineChartLabels.push('Tuesday');  
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}

        case 3: { this.lineChartLabels.push('Wednesday');
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}

        case 4: { this.lineChartLabels.push('Thursday');
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}

        case 5: { this.lineChartLabels.push('Friday');
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}

        case 6: { this.lineChartLabels.push('saturday');
                  this.lineChartData[0].data.push(amountStudent); 
                  amountStudent = 0; break;}
      }
    }
  }

  /***************************************************/

  public searchMonthly() : void {
    this.assistances = new Array<Assistance>();

    this.asssitanceService.getAssistances().subscribe(
      result => {
        result.forEach(element => {
          let vAssistence : Assistance = new Assistance();
          Object.assign(vAssistence,element);
          this.assistances.push(vAssistence);
        });

        this.setLineChartMonthly();

        /*this.lineChartData.push(
          { label: 'Amount Student' },
        );*/
      },

      error => {
        console.log(error);
      }
    );
  }

  /***************************************************/
  private setLineChartMonthly() : void {
    let amountStudent : number = 0;
   
    for(let i = 0; i < this.assistances.length; i++){

      amountStudent = amountStudent + this.assistances[i].student.length;

      if( ((this.assistances.length -1) ==  i) || (this.assistances[i].monthly != this.assistances[i+1].monthly) )  {
        switch(this.assistances[i].monthly) { 
          case 0: { this.lineChartLabels.push('January'); 
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 1: { this.lineChartLabels.push('February');  
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 2: { this.lineChartLabels.push('March');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 3: { this.lineChartLabels.push('April');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 4: { this.lineChartLabels.push('May');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 5: { this.lineChartLabels.push('June');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 6: { this.lineChartLabels.push('July');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}

          case 7: { this.lineChartLabels.push('August');
                    this.lineChartData[0].data.push(amountStudent); 
                    amountStudent = 0; break;}
        } 
      }
    }
  }

  /***************************************************/

  public searchMonthlyPayment() : void {
    this.payments = new Array<Payment>();

    this.paymentService.getPayments().subscribe(
      result => {
        result.forEach(element => {
          let vPayment : Payment = new Payment();
                
          //Object.assign(vPayment,element);

          vPayment.pay_day = new Date(element.pay_day);

          this.payments.push(vPayment);
        });

        this.setLineChartMonthlyPayment();
      },

      error => {
        console.log(error);
      }
    );
  }
  /***************************************************/

  private setLineChartMonthlyPayment() : void {
    let amountPayment : number = 0;
  
    for(let i = 0; i < this.payments.length; i++){

      amountPayment++;

      if( ((this.payments.length -1) ==  i) || ( this.payments[i].pay_day.getMonth() != this.payments[i+1].pay_day.getMonth() ) )  {
        switch(this.payments[i].pay_day.getMonth()) { 
          case 0: { this.lineChartLabels.push('January'); 
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 1: { this.lineChartLabels.push('February');  
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 2: { this.lineChartLabels.push('March');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 3: { this.lineChartLabels.push('April');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 4: { this.lineChartLabels.push('May');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 5: { this.lineChartLabels.push('June');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 6: { this.lineChartLabels.push('July');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 7: { this.lineChartLabels.push('August');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 8: { this.lineChartLabels.push('September');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}
          
          case 9: { this.lineChartLabels.push('October');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 10: { this.lineChartLabels.push('November');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}

          case 11: { this.lineChartLabels.push('December');
                    this.lineChartData[0].data.push(amountPayment); 
                    amountPayment = 0; break;}
        } 
      }
    }
  }
  /***************************************************/

  public clear() : void {
    this.lineChartData = new Array<ChartDataSets>();
    this.lineChartLabels = new Array<Label>();
    window.location.reload();
  }

  /***************************************************/
}

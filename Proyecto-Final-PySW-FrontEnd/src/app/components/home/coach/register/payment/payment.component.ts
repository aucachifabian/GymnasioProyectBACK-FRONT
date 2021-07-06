import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment/payment';
import { Student } from 'src/app/models/student/student';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { StudentService } from 'src/app/services/student/student.service';
//import * as printJS from 'print-js';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';
import { DayRoutineService } from 'src/app/services/day_routine/day-routine.service';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { LoginService } from 'src/app/services/login/login.service';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import * as es6printJS from "print-js";
import { printStyle } from './print'
//import { readFileSync } from 'file-system';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public dayRoutines : Array<DayRoutine>;
  public formDni : string;
  public payment : Payment;
  public student : string;
  public queryIntensity : String;
  public queryArrangement : Arrangement;
  public changeRoutine : boolean;
  public arrangements: Array<Arrangement>;
  public paymentSuccess : boolean;
  public codePayment : String;
  public expiration_date:String;
  public routineWork: DayRoutine;
  public stylePrint : printStyle;
  /**************************************************************/

  constructor(private paymentService: PaymentService,
              private studentService: StudentService,
              private toastr : ToastrService,
              private dayRoutineService : DayRoutineService,
              public loginService : LoginService,
              private arrangementService :  ArrangementService) {
   this.initVariables();
   this.stylePrint = new printStyle;
  }

  /**************************************************************/

  initVariables()
  {
    this.formDni = "";
    this.paymentSuccess = false;                   
    this.student = '';
    this.payment = new Payment();
    this.getDayRoutines();
    this.changeRoutine = true;
    this.getArrangements();
    this.routineWork = new DayRoutine();
    this.routineWork.intensity="";
    this.routineWork.objective="";
  }


  ngOnInit(): void {
  }

  /**************************************************************/
 
  print() { 
  es6printJS({showModal:true, style : this.stylePrint.getStyle() ,base64:true,printable:"printJS-form",type:"html"});
  }

  /**************************************************************/

  public searchDni() : void {
    this.studentService.getStudentByDni(this.formDni).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("","Success");
          this.cargarForm(result.student);
          this.changeRoutine = false;
          this.getRoutinesByArrangement(this.payment.name_arrangement);
             if(result.student.day_routine==undefined)
             {
              this.routineWork.objective = "";
              this.routineWork.intensity = "";
             }
             else
             {
              Object.assign(this.routineWork, result.student.day_routine);
             }
        }
        else {
          this.toastr.error(result.msg, "Error");
        }
      },
      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }


  changeintensity()
  {
   this.getRoutinesByIntensityAndArrangement(this.queryIntensity, this.payment.name_arrangement);
  }


  cargarForm(student:any)
  {
    this.student = student.name +" "+ student.surname;
    this.payment.student = student;
    this.payment.name_arrangement = student.arrangement.name;
    this.payment.price = student.arrangement.price;
    this.payment.amount_day = student.arrangement.amount_day;
    this.queryIntensity = "todas";
  }

  getRoutinesByArrangement(name_arrangement)
  { this.dayRoutines =  new Array<DayRoutine>();
    this.dayRoutineService.findDayRoutineByArrangement(name_arrangement).subscribe(
      result => {
        result.forEach(element => {
          let vDayRoutine : DayRoutine = new DayRoutine();
          Object.assign(vDayRoutine, element);
          this.dayRoutines.push(vDayRoutine);
        });
      },
      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  getRoutinesByIntensityAndArrangement(intensity,arrangement)
  {
    this.dayRoutines =  new Array<DayRoutine>();
    this.dayRoutineService.findDayRoutineByArrangementAndIntensity(arrangement,intensity).subscribe(
      result => {
        result.forEach(element => {
          let vDayRoutine : DayRoutine = new DayRoutine();
          Object.assign(vDayRoutine, element);
          this.dayRoutines.push(vDayRoutine);
        });
      },
      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  /**************************************************************/

  public createPayment(formSearch : NgForm, formPrint : NgForm) : void {
    this.paymentService.createPayment(this.payment, this.routineWork).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success(result.msg,"Success");
          this.codePayment = result.payment;
          this.expiration_date = result.end_date;
          this.paymentSuccess = true;
         
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

  /**************************************************************/
  public getDayRoutines() : void {
    this.dayRoutines =  new Array<DayRoutine>();
    this.dayRoutineService.getDayRoutines().subscribe(
      result => {
        result.forEach(element => {
          let vDayRoutine : DayRoutine = new DayRoutine();

          Object.assign(vDayRoutine, element);

          this.dayRoutines.push(vDayRoutine);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  public getArrangements()
  {
    this.arrangements =  new Array<Arrangement>();
    this.arrangementService.getArrangements().subscribe(
      result => {
        result.forEach(element => {
          let vArrangement : Arrangement = new Arrangement();

          Object.assign(vArrangement, element);

          this.arrangements.push(vArrangement);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );    
  }

  changeArrangement(a:Arrangement){
    this.payment.name_arrangement = a.name;
    this.payment.amount_day = a.amount_day;
    this.payment.price = a.price;
    this.routineWork = new DayRoutine();
    this.routineWork.intensity ="";
    this.routineWork.objective = "";
    this.getRoutinesByArrangement(a.name);
  }

  selectRoutine(routineSelected){
    this.routineWork=routineSelected;
  }
}

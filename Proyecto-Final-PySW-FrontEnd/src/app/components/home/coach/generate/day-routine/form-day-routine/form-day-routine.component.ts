import { AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nextTick } from 'process';
import { Arrangement  } from 'src/app/models/arrangement/arrangement';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';
import { Routine } from 'src/app/models/routine/routine';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { DayRoutineService } from 'src/app/services/day_routine/day-routine.service';
import { LoginService } from 'src/app/services/login/login.service';
import { RoutineService } from 'src/app/services/routine/routine.service';
import Swal from 'sweetalert2';
import { __await } from 'tslib';
@Component({
  selector: 'app-form-day-routine',
  templateUrl: './form-day-routine.component.html',
  styleUrls: ['./form-day-routine.component.css',] 
})
export class FormDayRoutineComponent implements OnInit {

  public arrangement : Arrangement;
  public action : string;
  public arrangements: Array<Arrangement>;
  public form : boolean;
  public routines : Array<Routine>;
   public routineWork : DayRoutine;
   public step1:  String;
   public step2:  String;
   public step3:  String;
  //------------------------------------------------------------//

  constructor(private arrangementService : ArrangementService,
              private toastr : ToastrService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              private routineService : RoutineService,
              private dayRoutineService : DayRoutineService,
              public loginService : LoginService
              ) { 
             this.step1 = "disable";
              this.step2 = "disable";
              this.step3 = "disable";
              }


  //------------------------------------------------------------//

  ngOnInit(): void {
    this.form = true;
     this.activateRoute.params.subscribe(
      params => {
        this.routineWork = new DayRoutine();
        if(params.id != "new") {
          this.action = "edit";
          this.editDayRoutine(params.id);
          this.arrangement = this.routineWork.arrangement;
        }
        else if (params.id == "new"){
          this.action = "new";
          this.routineWork = new DayRoutine();
          this.routineWork.routine = new Array<Routine>();
          this.arrangement = new Arrangement()
        }
      }   
    );
    this.getRoutines();
      this.getArragements();
  }

  public editDayRoutine(id)
  {
    this.dayRoutineService.getDayRoutine(id).subscribe(
      result => {
        Object.assign(this.routineWork, result);
        this.arrangement = this.routineWork.arrangement;
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  

  saveRoutineDay(formRoutine : NgForm) : void {
        let a;  
        if(this.action=='edit')
           this.saveDayRoutine(formRoutine);
        else
           this.registerDayRoutine(formRoutine);

        this.chooseNextStep();
  }

  public saveDayRoutine(formRoutine : NgForm) : void {
    this.dayRoutineService.updateDayRoutine(this.routineWork).subscribe(
      result => {
        if(result.status == "1"){
          formRoutine.reset();
          this.step3 = "active";
          this.routineWork = new DayRoutine();
          this.routineWork.routine = new Array<Routine>();
        }
        else {
          this.toastr.error("Error", "Rutina no Guardada.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR.");
      }
    );
  }

  //------------------------------------------------------------//

  public registerDayRoutine(formRoutine : NgForm) : void {
    this.dayRoutineService.createDayRoutine(this.routineWork).subscribe(
      result => {
        if(result.status == "1"){
          formRoutine.reset();
          this.routineWork = new DayRoutine();
          this.step3 = "active";
          this.routineWork.routine = new Array<Routine>();
        }
        else {
          this.toastr.error("Error.", "routine not registerd.");
        }
      },
  
      error => {
        this.toastr.error("ERROR.","ERROR");
     }
    );
    this.routineWork = new DayRoutine();
    this.routineWork.routine = new Array<Routine>();
  }
  
  //------------------------------------------------------------//
  
  public returnDayRoutine() : void {
    this.routineWork = new DayRoutine();
    this.action = "";
    this.router.navigate(["dayRoutine"]);
  }
  
  //------------------------------------------------------------//
  public getArragements(): void {
    this.arrangements = new Array<Arrangement>();

    this.arrangementService.getArrangements().subscribe(
      result => {
        result.forEach(element => {
          let vArrangement : Arrangement = new Arrangement();

          Object.assign(vArrangement, element);

          this.arrangements.push(vArrangement);
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  public getRoutines() : void {
    this.routines = new Array<Routine>();

    this.routineService.getRoutines().subscribe(
      result => {
        result.forEach(element => {
          let vRoutine : Routine = new Routine();

          Object.assign(vRoutine, element);

          this.routines.push(vRoutine);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  public addRoutine(name): void {
    if(this.routineWork.routine.length==this.routineWork.day)
      { this.toastr.info("Informacion.","Ya no se pueden agregar mas rutinas.");
        this.step2 = "active";
       }
      else
      {
       this.routineWork.routine.push(name);
       this.step2 = "disable";
       this.toastr.success("Confirmacion.","Rutina N° " + this.routineWork.routine.length + " agregada correctamente");
      }
  }

  public deleteRoutine(a): void {
     this.routineWork.routine.splice(a,1);
     this.step2 = "disable";
   }


   public step1Done():void{
     this.step1 = "active";
     this.form = false;
     if(this.routineWork.routine.length==this.routineWork.day)
       this.step2="active"
   }

   async changeArrangement()
   { if(this.action=='edit')
     { if(this.arrangement.amount_day*4 < this.routineWork.routine.length)
       {  
         let a = await this.confirmChange();
         if(a)
         { this.routineWork.arrangement = this.arrangement;    
           this.routineWork.day = this.arrangement.amount_day*4;
           this.routineWork.routine.splice(this.arrangement.amount_day*4);
         }
         else
         {
           this.arrangement = this.routineWork.arrangement;
         }
       }
       else
       {
         this.routineWork.arrangement = this.arrangement;
         this.routineWork.day = this.arrangement.amount_day*4;
         this.step2="disable";
       }
     }
     else
     {
      this.routineWork.arrangement = this.arrangement;
      this.routineWork.day = this.arrangement.amount_day*4;
    }
   }
   
   async confirmChange():Promise<boolean>{
   let a = false;
    await Swal.fire({  
      title: 'Esta seguro de querer modificar el plan?',  
      text: 'Podria perder informacion de las rutinas Asignadas',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Si, cambiar Plan',  
      cancelButtonText: 'No, conservar Plan Actual'  
    }).then((result) => {  
      if (result.value) {   
        a = true;
       } 
    })
    return a;
   }

   async chooseNextStep()
   {
    await Swal.fire({
      title: ' Se guardo con exito el registro',
      text: " Se guardo con exito la rutina : " + this.routineWork.objective + ". \n                  Intentidad :" + this.routineWork.intensity + ".\n                  Duracion : " + this.routineWork.day ,
      showCancelButton: true,
      allowOutsideClick: false,
      icon : 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: ' Ver Rutinas ',
      cancelButtonText : " Agregar nuevo registro " 
    }).then((result) => {
      if (result.isConfirmed) {        
        this.router.navigate(["dayRoutine"]);
      }
      else
      { this.step1 = "disable";
      this.step2 = "disable";
      this.step3 = "disable"; 
      this.form = true;
       this.router.navigate(["dayRoutine/form/", "new"]);
      }
    })
   } 

   clearArrayRoutine()
   {
     this.routineWork.routine = new Array<Routine>();
     this.step2 = "disable";
   }
}


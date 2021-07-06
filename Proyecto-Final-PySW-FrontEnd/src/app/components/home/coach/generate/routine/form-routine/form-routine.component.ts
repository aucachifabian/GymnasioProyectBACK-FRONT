import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Routine } from 'src/app/models/routine/routine';
import { Training } from 'src/app/models/training/training';
import { LoginService } from 'src/app/services/login/login.service';
import { RoutineService } from 'src/app/services/routine/routine.service';
import { TrainingService } from 'src/app/services/training/training.service';
import Swal from 'sweetalert2';
import { __await } from 'tslib';

@Component({
  selector: 'app-form-routine',
  templateUrl: './form-routine.component.html',
  styleUrls: ['./form-routine.component.css']
})
export class FormRoutineComponent implements OnInit {

  public action : string;
  public form : boolean;
  public trainings : Array<Training>;
   public routineWork : Routine;
   public step1:  String;
   public step2:  String;
   public step3:  String;
   public index: number;
  //------------------------------------------------------------//

  constructor(private toastr : ToastrService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              private trainingService : TrainingService,
              private routineService : RoutineService,
              public loginService : LoginService
              ) { 
              this.getTraining();
             this.step1 = "disable";
              this.step2 = "disable";
              this.step3 = "disable";
              this.form = true;
              this.index = 0;
            }

  //------------------------------------------------------------//

  ngOnInit(): void {
     this.activateRoute.params.subscribe(
      params => {
        this.routineWork = new Routine();
        if(params.id != "new") {
          this.action = "edit";
          this.editRoutine(params.id);
        }
        else if (params.id == "new"){
          this.action = "new";
          this.routineWork = new Routine();
          this.routineWork.training = new Array<Training>();
        }
      }   
    );
    this.getTraining();
  }

  public async editRoutine(id)
  {
  await  this.routineService.getRoutine(id).subscribe(
      result => {
        Object.assign(this.routineWork, result);
      },
      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  
  next(direction)
  {
    if(direction=="Left")
    {  
      if(this.index==0)
      {
        this.index = this.trainings.length;
      }
      else
      {
         this.index = this.index-1;
      }
    }
    else
    {
      if(this.index==this.trainings.length)
      {
        this.index=0;
      }
      else
      {
         this.index = this.index+1;
      }
    }
  }

  calcNext(index)
  {
    if(index>=this.trainings.length)
    {
      return index-this.trainings.length;
    }
    else
    {
        return index+1;
    }
  }

  save(formRoutine : NgForm) : void {
        let a;  
        if(this.action=='edit')
           this.saveRoutine(this.routineWork);
        else
           this.registerRoutine(formRoutine);
        
        this.chooseNextStep();
  }

  public saveRoutine(routine) : void {
    this.routineService.updateRoutine(this.routineWork).subscribe(
      result => {
        if(result.status == "1"){
          this.routineWork = new Routine();
          this.routineWork.training = new Array<Training>();
          this.step3 = "active";
        }
        else {
          this.toastr.error("Error", "Rutina no Guardada.");
        }
      },

      error => {
        this.toastr.error("ERROR", error);
      }
    );
  }

  //------------------------------------------------------------//

  public registerRoutine(routine) : void {
    console.log(" aa : " +  JSON.stringify(this.routineWork))
    this.routineService.createRoutine(this.routineWork).subscribe(
      result => {
        if(result.status == "1"){
          this.routineWork = new Routine();
          this.routineWork.training = new Array<Training>();
          this.step3 = "active";
        }
        else {
          this.toastr.error("Error.", "routine not registerd. ");
        }
      },
  
      error => {
        this.toastr.error("ERROR.","ERROR");
     }
    );
    this.routineWork = new Routine();
    this.routineWork.training = new Array<Training>();
  }
  
  //------------------------------------------------------------//
  
  public returnRoutine() : void {
    this.routineWork = new Routine();
    this.action = "";
    this.router.navigate(["routine"]);
  }
  

  public async getTraining() : Promise<void> {
    this.trainings = new Array<Training>();
    await this.trainingService.getTrainings().subscribe(
      result => {
        result.forEach(element => {
          let vTraining : Training = new Training();

          Object.assign(vTraining, element);

          this.trainings.push(vTraining);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  public addTraining(name): void {
      {
        this.routineWork.training.push(name);
        this.step2 = "active";
      }
  }

  public deleteTraining(a): void {
     if(this.routineWork.training.length==1)
      {
        this.step2="disable"
      }
     this.routineWork.training.splice(a,1);
   }


   public step1Done():void{
     this.step1 = "active";
     this.form = false;
     if(this.routineWork.training.length>0)
       this.step2="active"
   }

   async chooseNextStep()
   {
    await Swal.fire({
      title: ' Se guardo con exito el registro',
      text: " Se guardo con exito la rutina : " + ". \n                  Intentidad :" + this.routineWork.intensity + ".\n                  Duracion : " ,
      showCancelButton: true,
      allowOutsideClick: false,
      icon : 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: ' Ver Rutinas ',
      cancelButtonText : " Agregar nuevo registro " 
    }).then((result) => {
      if (result.isConfirmed) {        
        this.router.navigate(["routine"]);
      }
      else
      { this.step1 = "disable";
      this.step2 = "disable";
      this.step3 = "disable"; 
      this.form = true;
      this.routineWork = new Routine();
      this.routineWork.training = new Array<Training>();
       this.router.navigate(["routine/form/", "new"]);
      }
    })
   } 

   clearArrayTraining()
   {
     this.routineWork.training = new Array<Training>();
     this.step2 = "disable";
   }

   onFileChanges(files){
    // console.log("File has changed:", files);
     this.routineWork.img = files[0].base64;
   }
}






import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';
import { Routine } from 'src/app/models/routine/routine';
import { Training } from 'src/app/models/training/training';
import { DayRoutineService } from 'src/app/services/day_routine/day-routine.service';
import { LoginService } from 'src/app/services/login/login.service';
import { RoutineService } from 'src/app/services/routine/routine.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-routine',
  templateUrl: './student-routine.component.html',
  styleUrls: ['./student-routine.component.css']
})
export class StudentRoutineComponent implements OnInit {

  public day_routine : DayRoutine;
  public routines : Array<Routine>;
  public trainings : Array<Training>;
  public btnPlus : boolean = false;
  public amount_day : number;

  /*****************************************************/

  constructor(public loginService : LoginService,
              private studentService : StudentService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              private dayRoutineService : DayRoutineService,
              private toastr : ToastrService,
              private routineService : RoutineService) { 
  }

  /*****************************************************/

  async ngOnInit(): Promise<void> {
    this.day_routine = new DayRoutine();
    this.routines = new Array<Routine>();
    this.trainings = new Array<Training>();

    this.activateRoute.params.subscribe(
      async params => {
        await this.getStudent(params.id);

        //this.setTrainings();
      }
    );
  }

  /*****************************************************/

  private async getStudent(id : string) : Promise<void> {
    await this.studentService.getStudent(id).subscribe(
      async result => {
        this.amount_day = result.arrangement.amount_day;
        this.getDayRoutine(result.day_routine._id);
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }
  
  /*****************************************************/

  private getDayRoutine(id : string) : void {
    this.dayRoutineService.getDayRoutine(id).subscribe(
      result => {
        Object.assign(this.day_routine,result);

        result.routine.forEach(element => {
          let vRoutine : Routine = new Routine();

          Object.assign(vRoutine,element);

          this.routines.push(vRoutine);
        });        
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );

  }

  /*****************************************************

  public setTrainings() : void {

    for(let i = 0; i < this.routines.length; i++){

      for(let j = 0; j < this.routines[i].training.length; j++){

        this.routines[i].training[j] = this.trainings.find( search => 
          (search._id == this.routines[i].training[j]._id)
        );
      }
    }

    console.log(this.routines);
  }
  /

  /*****************************************************/

  public searchTrainings(id : string) : void {
    this.trainings = new Array<Training>();

    this.routineService.getRoutine(id).subscribe(
      result => {
        if(result != null){
          result.training.forEach(element => {
            let vTraining : Training = new Training();

            Object.assign(vTraining,element);

            this.trainings.push(vTraining);
          });

          this.toastr.success("","Success"); 
          this.btnPlus = true;
        }
        else{
          this.toastr.error("Error","Error");
        }       
      },
      
      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  /*****************************************************/

  public return() : void {
    this.btnPlus = false;
  }

  /*****************************************************/

  public returnHome() : void {
    this.router.navigate(["student/home"])
  }

  /*****************************************************/

}

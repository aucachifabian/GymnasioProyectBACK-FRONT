
import { Component, OnInit } from '@angular/core';
import { Routine } from 'src/app/models/routine/routine';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoutineService } from 'src/app/services/routine/routine.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  public routines : Array<Routine>;
  constructor(
    private toastr : ToastrService,
    private router : Router,
    private routineService : RoutineService,
    public loginService : LoginService) { 
}

  ngOnInit(): void {
    this.getRoutines();
  }

  //------------------------------------------------------------//

  public getRoutines() : void {
    this.routines =  new Array<Routine>();
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

  //------------------------------------------------------------//

  public deleteRoutine(id : string) : void {
    this.routineService.deleteRoutine(id).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Routine deleted.");
          this.getRoutines();
        }
        else {
          this.toastr.error("Error", "Routine not deleted.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  //------------------------------------------------------------//

  public addNewRoutine() : void {
    this.router.navigate(["routine/form", "new"]);
  }
 
  //------------------------------------------------------------//

  public editRoutine(id : string) : void {
    this.router.navigate(["routine/form", id]);
  }

}
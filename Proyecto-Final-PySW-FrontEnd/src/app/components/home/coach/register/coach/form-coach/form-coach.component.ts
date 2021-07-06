import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Coach } from 'src/app/models/coach/coach';
import { CoachService } from 'src/app/services/coach/coach.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-form-coach',
  templateUrl: './form-coach.component.html',
  styleUrls: ['./form-coach.component.css']
})
export class FormCoachComponent implements OnInit {

  public coach: Coach;
  public action : string;

  /***************************************************/

  constructor(private coachService: CoachService,
              private activateRoute: ActivatedRoute,
              private router : Router,
              private toastr : ToastrService,
              public loginService : LoginService) {
  }

  /***************************************************/

  ngOnInit(): void {
    this.coach = new Coach();

    this.activateRoute.params.subscribe(
      params => {
      
        if(params.id != "new") {
          this.action = "edit";
          this.getCoach(params.id);
        }
        else if (params.id == "new"){
          this.action = "new";
        }
      }
    );
  }

  /***************************************************/

  public createCoach(formCoach : NgForm) : void {
    this.coachService.createCoach(this.coach).subscribe(
      result => {
        if (result.status == "1") {
          this.toastr.success(result.msg,"Success");
          formCoach.reset();
          this.coach = new Coach();
        }
        else
          this.toastr.error(result.msg, "Error");
      },
      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    )
  }

  /***************************************************/

  public updateCoach(formCoach : NgForm) : void {
    this.coachService.updateCoach(this.coach).subscribe(
      result => {
        if (result.status == "1") {
          this.toastr.success(result.msg,"Success");
          this.return(formCoach);
        }
        else
          this.toastr.error(result.msg,"Error");
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    )
  }

  /***************************************************/

  public getCoach(id: string) : void {
    this.coachService.getCoach(id).subscribe(
      result => {
        Object.assign(this.coach, result);
      },
      err => {
      }
    )
  }

  /***************************************************/
  
  public return(formCoach : NgForm) : void {
    formCoach.reset();
    this.coach = new Coach();
    this.action = "";
    this.router.navigate(["coach/"]);
  }
}

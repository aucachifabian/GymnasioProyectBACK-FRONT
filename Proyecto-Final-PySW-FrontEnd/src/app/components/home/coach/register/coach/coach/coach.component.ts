import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Coach } from 'src/app/models/coach/coach';
import { CoachService } from 'src/app/services/coach/coach.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {

  public coachs : Array<Coach>;

  /*****************************************************/

  constructor(private coachService : CoachService,
              private router: Router,
              private toastr : ToastrService,
              public loginService : LoginService) {
  }

   /*****************************************************/

   ngOnInit(): void {
    this.getCoachs();
  }

  /*****************************************************/

  private getCoachs() : void {
    this.coachs = new Array<Coach>();

    this.coachService.getCoachs().subscribe(
      result => {
        result.forEach(element => {
          let vCoach : Coach = new Coach();

          Object.assign(vCoach, element);

          this.coachs.push(vCoach);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    )
  }

  /*****************************************************/

  public deleteCoach(id : string) {
    this.coachService.deleteCoach(id).subscribe(
      result => {
        if(result.status == "1"){
          this.getCoachs();
          this.toastr.success(result.msg,"Success");
        }
      },
      err => {
        this.toastr.error("ERROR","ERROR");
      }
    )
  }

  /*****************************************************/

  public updateCoach(coach : Coach) {
    this.router.navigate(["coach/form/", coach._id]);
  }

  /*****************************************************/

  public addNewCoach() {
    this.router.navigate(["coach/form/", "new"]);
  }
}

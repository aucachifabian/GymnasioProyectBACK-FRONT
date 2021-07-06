import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assistance } from 'src/app/models/assistance/assistance';
import { Student } from 'src/app/models/student/student';
import { AssistanceService } from 'src/app/services/assistance/assistance.service';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-assistence',
  templateUrl: './student-assistence.component.html',
  styleUrls: ['./student-assistence.component.css']
})
export class StudentAssistenceComponent implements OnInit {

  public assistances : Array<Assistance>;
  private student : Student;

  /***************************************************/

  constructor(private toastr : ToastrService,
              private assistanceService : AssistanceService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              public loginService : LoginService) { 
  }

  /***************************************************/

  ngOnInit(): void {
    this.assistances = new Array<Assistance>();

    this.activateRoute.params.subscribe(
      params => {
        this.getAssistance(params.id);
      }
    );
  }

  /***************************************************/

  private getAssistance(id : string) : void {
    this.assistanceService.getAssistanceByIdStudent(id).subscribe(
      result => {
        if(result.status == "1") {
          result.assistance.forEach(element => {
            let vAssistance : Assistance = new Assistance();
            
            Object.assign(vAssistance,element);

            this.assistances.push(vAssistance);
          });
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

  /***************************************************/

  public back() : void {
    this.router.navigate(["student/home"]);
  }

  /***************************************************/
}

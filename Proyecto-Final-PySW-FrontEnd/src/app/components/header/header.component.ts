import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student/student';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private student : Student;
  /****************************************************/

  constructor(public loginService : LoginService, public router : Router, private studentService : StudentService,  private toastr : ToastrService) { 
      this.getStudent();
  }
  /****************************************************/
  ngOnInit(): void {
    this.getStudent();
  }

  private async getStudent() : Promise<void> {
    if(this.loginService.isLogged()=='student')
    {
      this.student = new Student();
    await this.studentService.getStudentByDni(this.loginService.isOwner()).subscribe(
      result => {
        if(result.status == "1"){
          Object.assign(this.student,result.student);
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
  }

  /****************************************************/

  public logout() : void {
    this.loginService.logout();
  }

   /***************************************************/

   public checkAssistance() : void {
    this.router.navigate(["student/assistance",this.student._id]);
  }

  /***************************************************/

  public checkPayment() : void {
    this.router.navigate(["student/payment",this.student._id]);

  }

  /***************************************************/

  public checkRoutine() : void {
    this.router.navigate(["student/routine",this.student._id]);
  }
}

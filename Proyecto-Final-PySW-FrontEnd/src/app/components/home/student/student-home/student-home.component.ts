import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student/student';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  public student : Student;

  /***************************************************/

  constructor(private studentService : StudentService,
              public loginService : LoginService,
              private toastr : ToastrService,
              private router : Router) { 
  }

  /***************************************************/

  async ngOnInit(): Promise<void> {
    this.student = new Student();

    await this.getStudent();
  }

  /***************************************************/

  private async getStudent() : Promise<void> {
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

  /***************************************************/

}

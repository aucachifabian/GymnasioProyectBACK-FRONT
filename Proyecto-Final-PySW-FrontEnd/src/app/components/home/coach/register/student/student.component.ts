import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { Student } from 'src/app/models/student/student';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public student: Student; 
  public arrangements: Array<Arrangement>;

  //---------------------------------------------------------//

  constructor(private studentService : StudentService,
              private arrangementService : ArrangementService,
              private toastr : ToastrService,
              public loginService : LoginService) {

    this.student = new Student();
    this.getArragements();
  }

  //---------------------------------------------------------//

  ngOnInit(): void {
  }

  //---------------------------------------------------------//

  public registerStudent(formStudent : NgForm): void {

    this.student.end_date = new Date(1999,0);
    this.student.amount_day = 0;

    this.studentService.createStudent(this.student).subscribe(
      result => {
        if (result.status == "1") {
          this.toastr.success(result.msg,"Success");
          formStudent.reset();
          this.student = new Student();
        }
        else{
          this.toastr.error(result.msg,"Error");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }

  //---------------------------------------------------------//

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

  //---------------------------------------------------------//

}

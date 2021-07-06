import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Assistance } from 'src/app/models/assistance/assistance';
import { Student } from 'src/app/models/student/student';
import { AssistanceService } from 'src/app/services/assistance/assistance.service';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {

  public assistance : Assistance;
  public student  : Student;
  public students : Array<Student>;

  //---------------------------------------------------------------------//

  constructor(private assistanceService : AssistanceService,
              private studentService : StudentService,
              private toast : ToastrService,
              public loginService : LoginService) {
  }

  //---------------------------------------------------------------------//

  ngOnInit(): void {
    this.assistance = new Assistance();
    this.student = new Student();

    this.getStudents();

    
  }

  //---------------------------------------------------------------------//

  public registerStudent(formAssistence : NgForm) : void {
    this.assistance.student = new Array<Student>();
    this.assistance.student.push(this.student);
  
    this.assistanceService.createAssistance(this.assistance).subscribe(
      result => {
        if (result.status == "1"){
          this.toast.success(result.msg,"Success");
          formAssistence.reset();
          this.assistance =  new Assistance();
          this.student  = new Student();
        }
        else {
          this.toast.error(result.msg,"Error");
        }
      },

      error => {
        this.toast.error("ERROR","ERROR");
      }
    );
  }

  //---------------------------------------------------------------------//

  public getStudents() : void {
    this.students    = new Array<Student>();
  
    this.studentService.getStudents().subscribe(
      result => {
        result.forEach(element => {
          let vStudent : Student = new Student();

          Object.assign(vStudent,element);

          this.students.push(vStudent);
        });
      },

      error => {
        console.log(error);
      }
    )
  }

  //---------------------------------------------------------------------//
  
}

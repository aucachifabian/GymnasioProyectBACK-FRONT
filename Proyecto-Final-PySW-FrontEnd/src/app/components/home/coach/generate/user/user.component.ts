import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { CoachService } from 'src/app/services/coach/coach.service';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public dni : string;
  public value : string;
  public user : User;
  public btnSearch : boolean = false;
  public btnPassword : boolean = false;

  //---------------------------------------------//

  constructor(private studentService : StudentService,
              private coachService   : CoachService,
              private userService : UserService,
              private toastr : ToastrService,
              public loginService : LoginService) {

  }

  //---------------------------------------------//

  ngOnInit(): void {
    this.user = new User();
  }

  //---------------------------------------------//

  public search() : void {
    if(this.value == "coach"){
      this.coachService.getCoachByDni(this.dni).subscribe(
        result => {
          if(result.status == "1"){
            this.user.coach = result.coach._id;
            this.user.type_user = this.value;
            this.user.user_name = result.coach.dni;
            this.btnSearch = true;
            this.toastr.success(result.msg,"Success");
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

    if(this.value == "student"){
      this.studentService.getStudentByDni(this.dni).subscribe(
        result => {
          if(result.status == "1"){
            this.user.student = result.student._id;
            this.user.type_user = this.value;
            this.user.user_name = result.student.dni;
            this.btnSearch = true;
            this.toastr.success(result.msg,"Success");
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
  }

  //---------------------------------------------//

  public getPassword() : void {
    let password : string = "";
    let numero : number;

    for(let i = 0; i < 6; i++){
      numero = Math.floor( Math.random() * 10 );

      password = password+numero.toString();
    }

    this.btnPassword = true;
    this.user.password = password;
  }

  //---------------------------------------------//

  public saveUser(formUser : NgForm, formSearch : NgForm) : void {
    this.userService.createUser(this.user).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success(result.msg, "Success");
          formUser.reset();
          formSearch.reset();
          this.user = new User();
          this.btnPassword = false;
          this.btnSearch = false;
        }
        else {
          this.toastr.error(result.msg, "Error");
          formUser.reset();
          formSearch.reset();
          this.user = new User();
          this.btnPassword = false;
          this.btnSearch = false;
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }

  //---------------------------------------------//
}

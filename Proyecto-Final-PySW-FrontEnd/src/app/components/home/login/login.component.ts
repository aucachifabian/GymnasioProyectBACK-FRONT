import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : User;

  /**********************************************************/

  constructor(private route : ActivatedRoute,
              private router : Router, 
              private loginService : LoginService,
              private toastr : ToastrService) {
  }

  /**********************************************************/

  ngOnInit(): void {
    this.user = new User();
  }

  /**********************************************************/

  public login() : void {
    this.loginService.login(this.user).subscribe(
      result => {
        var user = result;

        if (user.status == "1"){
          sessionStorage.setItem("token", user.token);
          sessionStorage.setItem("type_user", user.type_user);
          sessionStorage.setItem("owner", user.owner);
          sessionStorage.setItem("name", user.name);
          sessionStorage.setItem("surname", user.surname);
          this.toastr.success(user.msg,"Success");

          
          if(user.type_user == "coach"){
            this.router.navigate(["/payment"]);
          }

          if(user.type_user == "student"){
            this.router.navigate(["student/home"]);
          }
        }
        else {
          this.toastr.error(user.msg,"Error");
        }
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  /**********************************************************/
  
}

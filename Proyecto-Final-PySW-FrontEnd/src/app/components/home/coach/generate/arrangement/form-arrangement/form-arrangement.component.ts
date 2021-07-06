import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-form-arrangement',
  templateUrl: './form-arrangement.component.html',
  styleUrls: ['./form-arrangement.component.css']
})
export class FormArrangementComponent implements OnInit {

  public arrangement : Arrangement;
  public action : string;

  //------------------------------------------------------------//

  constructor(private arrangementService : ArrangementService,
              private toastr : ToastrService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              public loginService : LoginService) { 
  }

  //------------------------------------------------------------//

  ngOnInit(): void {
    this.arrangement = new Arrangement();

    this.activateRoute.params.subscribe(
      params => {
      
        if(params.id != "new") {
          this.action = "edit";
          this.editArrangement(params.id);
        }
        else if (params.id == "new"){
          this.action = "new";
        }
      }
    );
  }

  //------------------------------------------------------------//
  
  public editArrangement(id : string){
    this.arrangementService.getArrangement(id).subscribe(
      result => {
        Object.assign(this.arrangement, result);
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }

  //------------------------------------------------------------//

  public saveArrangement(formArrangement : NgForm) : void {
    this.arrangementService.updateArrangement(this.arrangement).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success","Arrangement saved.");
          formArrangement.reset();
        
          this.returnArrangement();
        }
        else {
          this.toastr.error("Error", "Arrangement not saved.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR.");
      }
    );
  }

  //------------------------------------------------------------//

  public registerArrangement(formArrangement : NgForm) : void {
    this.arrangementService.createArrangement(this.arrangement).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Arrangement Registered.");
          formArrangement.reset();
          this.arrangement = new Arrangement();
        }
        else {
          this.toastr.error("Error.", "Arrangement not registerd.");
        }
      },
  
      error => {
        this.toastr.error("ERROR.","ERROR");
     }
    );
  }

  //------------------------------------------------------------//

  public onFileChanges(file) : void {
    if(file[0] != null) {
      this.arrangement.img= file[0].base64;
    }
  }
  
  //------------------------------------------------------------//
  
  public returnArrangement() : void {
    this.arrangement = new Arrangement();
    this.action = "";

    this.router.navigate(["arrangement/"]);
  }
  
  //------------------------------------------------------------//

}

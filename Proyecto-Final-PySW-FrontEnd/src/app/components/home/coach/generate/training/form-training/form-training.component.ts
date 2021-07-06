import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Training } from 'src/app/models/training/training';
import { LoginService } from 'src/app/services/login/login.service';
import { TrainingService } from 'src/app/services/training/training.service';

@Component({
  selector: 'app-form-training',
  templateUrl: './form-training.component.html',
  styleUrls: ['./form-training.component.css']
})
export class FormTrainingComponent implements OnInit {

  public training : Training;
  public action : string;
  public msg    : string;

  //------------------------------------------------------------//

  constructor(private trainingService : TrainingService,
              private toastr : ToastrService,
              private activateRoute : ActivatedRoute,
              private router : Router,
              public loginService : LoginService) { 
  }

  //------------------------------------------------------------//

  ngOnInit(): void {
    this.training = new Training();

    this.activateRoute.params.subscribe(
      params => {
      
        if(params.id != "new") {
          this.action = "edit";
          this.editTraining(params.id);
        }
        else if (params.id == "new"){
          this.action = "new";
        }
      }
    );
  }

  //------------------------------------------------------------//
  
  public editTraining(id : string){
    this.trainingService.getTraining(id).subscribe(
      result => {
        Object.assign(this.training, result);
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }

  //------------------------------------------------------------//

  public saveTraining(formTraining : NgForm) : void {
    this.trainingService.updateTraining(this.training).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success","Training saved.");
          formTraining.reset();
        
          this.returnTraining();
        }
        else {
          this.toastr.error("Error", "Training not saved.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR.");
      }
    );
  }

  //------------------------------------------------------------//

  public registerTraining(formTraining : NgForm) : void {
    this.trainingService.createTraining(this.training).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Training Registered.");
          formTraining.reset();
          this.training = new Training();
        }
        else {
          this.toastr.error("Error.", "Training not registerd.");
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
      this.training.img= file[0].base64;
    }
  }

  //------------------------------------------------------------//
  
  public returnTraining() : void {
    this.training = new Training();
    this.action = "";

    this.router.navigate(["training/"]);
  }
  
  //------------------------------------------------------------//


}

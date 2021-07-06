import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Training } from 'src/app/models/training/training';
import { LoginService } from 'src/app/services/login/login.service';
import { TrainingService } from 'src/app/services/training/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  public trainings : Array<Training>;

  //------------------------------------------------------------//

  constructor(private trainingService : TrainingService,
              private toastr : ToastrService,
              private router : Router,
              public loginService : LoginService) { 
  }

  //------------------------------------------------------------//

  ngOnInit(): void {
    this.getTrainings();
  }

  //------------------------------------------------------------//

  public getTrainings() : void {
    this.trainings = new Array<Training>();

    this.trainingService.getTrainings().subscribe(
      result => {
        result.forEach(element => {
          let vTraining : Training = new Training();

          Object.assign(vTraining, element);

          this.trainings.push(vTraining);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  //------------------------------------------------------------//

  public deleteTraining(id : string) : void {
    this.trainingService.deleteTraining(id).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Training deleted.");
          this.getTrainings();
        }
        else {
          this.toastr.error("Error", "Training not deleted.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  //------------------------------------------------------------//

  public addNewTraining() : void {
    this.router.navigate(["training/form/", "new"]);
  }

  //------------------------------------------------------------//

  public editTraining(id : string) : void {
    this.router.navigate(["training/form/", id]);
  }

  //------------------------------------------------------------//


}

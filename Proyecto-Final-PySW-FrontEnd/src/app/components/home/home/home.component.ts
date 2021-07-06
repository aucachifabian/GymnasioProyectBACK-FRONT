import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { Training } from 'src/app/models/training/training';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { TrainingService } from 'src/app/services/training/training.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public position1 : number = 0;
  public position2 : number = 1;
  public position3 : number = 2;

  public trainings : Array<Training>;
  public trainingCrt : boolean = false;
  public arrangements : Array<Arrangement>

  //---------------------------------------------------//

  constructor(private trainingService : TrainingService,
              private arrangementService : ArrangementService,
              private router : Router) {

    this.getTrainings();
    this.getArrangements();
  }

  //---------------------------------------------------//

  ngOnInit(): void {
  }

  //---------------------------------------------------//

  private getTrainings() : void {
    this.trainings = new Array<Training>();
    
    this.trainingService.getTrainings().subscribe(
      result => {
        result.forEach(element => {
          let vTraining : Training = new Training();

          Object.assign(vTraining, element);
          
          this.trainings.push(vTraining);
        });

        if(result.length > 0){
          this.trainingCrt = true;
        }
      },

      error => {
        console.log(error);
      }
    );
  }

  //---------------------------------------------------//

  public getArrangements() : void {
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
    );
  }

  //---------------------------------------------------//
  
  public agregarNoticia() : void {
    this.router.navigate(["Noticia/Form"])
  }

  //---------------------------------------------------//

  public nextRight() : void {
    if (this.position1 == (this.trainings.length - 1))
      this.position1 = 0;
    else
      this.position1++;

    if (this.position2 == (this.trainings.length - 1))
      this.position2 = 0;
    else
      this.position2++;

    if (this.position3 == (this.trainings.length - 1))
      this.position3 = 0;
    else
      this.position3++;
  }

  //---------------------------------------------------//

  public nextLeft() : void {
   if (this.position1 == 0)
      this.position1 = this.trainings.length - 1;
    else
      this.position1--;

    if (this.position2 == 0)
      this.position2 = this.trainings.length - 1;
    else
      this.position2--;

    if (this.position3 == 0)
      this.position3 = this.trainings.length - 1;
    else
      this.position3--;
  }

  //---------------------------------------------------//

  public getLogin() : void {
    this.router.navigate(["login"]);
  }
}

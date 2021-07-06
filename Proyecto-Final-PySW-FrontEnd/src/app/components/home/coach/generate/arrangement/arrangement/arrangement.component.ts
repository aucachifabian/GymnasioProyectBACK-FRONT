import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.css']
})
export class ArrangementComponent implements OnInit {

  public arrangements : Array<Arrangement>;

  //------------------------------------------------------------//

  constructor(private arrangementService : ArrangementService,
              private toastr : ToastrService,
              private router : Router,
              public loginService : LoginService) { 
  }

  //------------------------------------------------------------//

  ngOnInit(): void {
    this.getArrangements();
  }

  //------------------------------------------------------------//

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
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  //------------------------------------------------------------//

  public deleteArrangement(id : string) : void {
    this.arrangementService.deleteArrangement(id).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Arrangement deleted.");
          this.getArrangements();
        }
        else {
          this.toastr.error("Error", "Arrangement not deleted.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  //------------------------------------------------------------//

  public addNewArrangement() : void {
    this.router.navigate(["arrangement/form/", "new"]);
  }

  //------------------------------------------------------------//

  public editArrangement(id : string) : void {
    this.router.navigate(["arrangement/form/", id]);
  }

  //------------------------------------------------------------//

}

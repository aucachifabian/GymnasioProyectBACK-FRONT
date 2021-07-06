import { Arrangement } from "../arrangement/arrangement";
import { Routine } from "../routine/routine";

export class DayRoutine {
    _id : String;
    day         : Number;
    objective   :  String;
    intensity   : String; 
    arrangement : Arrangement;
    routine     : Array<Routine>;

    constructor(){
    }
}

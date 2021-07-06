import { Arrangement } from "../arrangement/arrangement";
import { Student } from "../student/student";

export class Payment {
    
    public _id      : string;
    public student  : Student;
    public pay_day  : Date;
    public pay_mode : string;
    
    public name_arrangement : string;
    public amount_day   : number;
    public price        : number;

    constructor(){
    }
}

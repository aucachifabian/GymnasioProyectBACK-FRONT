import { Arrangement } from "../arrangement/arrangement";
import { DayRoutine } from "../day_routine/day-routine";

export class Student {
    
    public _id      : string;
    public surname  	: string;
    public name  		: string;
    public dni    		: string;
    public phone  		: string;
    public address  	: string;
    public email  		: string;
    public birth_date  	: Date;
    public start_date  	: Date;
    public end_date		: Date;
    public arrangement	: Arrangement;
    public day_routine	: DayRoutine;
    public amount_day   : number;

    constructor(){
    }
}

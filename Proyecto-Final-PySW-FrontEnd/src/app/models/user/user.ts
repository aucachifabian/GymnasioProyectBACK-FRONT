import { Coach } from "../coach/coach";
import { Student } from "../student/student";

export class User {

    public _id          : string;
    public coach 	 	: Coach;
    public student      : Student;
    public type_user 	: string;
    public password	    : string;
    public user_name 	: string;

    constructor(){
    }
}

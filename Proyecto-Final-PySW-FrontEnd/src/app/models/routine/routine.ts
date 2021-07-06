
import { Coach } from "../coach/coach";
import { Training } from "../training/training";

export class Routine {

    public _id      : string;
    public coach	: Coach;
    public type		: string;
    public serie 	: string;
    public repetition	: string;
    public rest			: string;
    public intensity	: string;
    public training		: Array<Training>;
    public img           : String;

    constructor(){
    }
}

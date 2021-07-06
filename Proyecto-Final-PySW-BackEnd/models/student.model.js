const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const Arrangement   = require('./arrangement.model');
const Day_Routine   = require('./day_routine.model');

const StudentSchema = new Schema({
    surname : { type : String, required : true },
    name    : { type : String, required : true },
    dni     : { type : String, required : true, unique : true },
    phone   : { type : String, required : true },
    email   : { type : String, required : true, unique : true },
    address : { type : String, required : true },
    birth_date  : { type : Date, required : true },
    start_date  : { type : Date, required : true },
    end_date    : { type : Date, required : true },
    amount_day    : { type : Number, required : true },
    arrangement : { type : Schema.Types.ObjectId, ref: Arrangement, required : true },
    day_routine : { type : Schema.Types.ObjectId, ref: Day_Routine, required : false },
});

module.exports = mongoose.models.Student || mongoose.model('Student', StudentSchema);

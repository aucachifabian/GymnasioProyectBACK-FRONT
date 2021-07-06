const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const Arrangement   = require('./arrangement.model');
const Routine       = require('./routine.model');

const Day_RoutineSchema = new Schema({
    day         : { type : Number, required : true },
    objective   : { type : String, required : true },
    intensity   : { type : String, required : true },
    arrangement : { type : Schema.Types.ObjectId, ref: Arrangement, required : true },
    routine     : [{ type : Schema.Types.ObjectId, ref: Routine, required : true }],
});

module.exports = mongoose.models.day_routine || mongoose.model('Day_Routine', Day_RoutineSchema);

const mongoose    = require('mongoose');
const { Schema }  = mongoose;

const Coach = require('./coach.model');
const Training = require('./training.model');

const RoutineSchema = new Schema({
   coach       : { type : Schema.Types.ObjectId, ref : Coach, required : false },
   type       : { type : String, required : true },
   serie       : { type : String, required : true },
   repetition  : { type : String, required : true },
   rest        : { type : String, required : true },
   intensity   : { type : String, required : true },
   training    : [{ type : Schema.Types.ObjectId, ref : Training, required : false }],
   img         : { type : String, required : false }
});

module.exports = mongoose.models.Routine || mongoose.model('Routine', RoutineSchema);
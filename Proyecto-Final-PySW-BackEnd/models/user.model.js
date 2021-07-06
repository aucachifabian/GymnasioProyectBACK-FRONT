const mongoose    = require('mongoose');
const { Schema }  = mongoose;

const Student  = require('./student.model');
const Coach    = require('./coach.model');

const UserSchema = new Schema({
   type_user   : { type : String, required : true },
   user_name   : { type : String, required : true,  unique : true  },
   password    : { type : String, required : true },
   student     : { type : Schema.Types.ObjectId, ref : Student, required : false, index : true,
      index: {
         unique: true,
         partialFilterExpression: { student :{  $exists : true },
       },
       default: null,
      }
   },
   coach     : { type : Schema.Types.ObjectId, ref : Coach, required : false , index : true,
      index: {
         unique: true,
         partialFilterExpression: { coach : {  $exists : true },
       },
       default: null,
      }
   },        
}); 

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
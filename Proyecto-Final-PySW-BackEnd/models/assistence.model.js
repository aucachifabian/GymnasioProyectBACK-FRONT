const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const Student       = require('./student.model');

const AssistanceSchema = new Schema({
    day        : { type  : Date, require : true },
    student    : [{ type : Schema.Types.ObjectId, ref : Student, required : true }],
    weekday    : { type  : Number, required : true },
    monthly     : { type  : Number, required : true }
});

module.exports = mongoose.models.day_assistence || mongoose.model('Assistence', AssistanceSchema);
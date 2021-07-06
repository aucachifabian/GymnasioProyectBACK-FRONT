const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const CoachSchema = new Schema({
    dni         : { type : String, required : true, unique : true },
    name        : { type : String, required : true },
    surname     : { type : String, required : true },
    phone       : { type : String, required : true, unique : true },
    email       : { type : String, required : true, unique : true },
    birth_date  : { type : Date, required : true },
});

module.exports = mongoose.models.Coach || mongoose.model('Coach', CoachSchema);
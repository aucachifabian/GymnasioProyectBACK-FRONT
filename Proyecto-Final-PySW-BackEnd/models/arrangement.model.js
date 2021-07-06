const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const ArrangementSchema = new Schema({
    name        : { type : String, required : true, unique : true },
    price       : { type : Number, required : true },
    img         : { type : String, required : true },
    amount_day  : { type : Number, required : true },
});


module.exports = mongoose.models.Arrangement || mongoose.model('Arrangement', ArrangementSchema);

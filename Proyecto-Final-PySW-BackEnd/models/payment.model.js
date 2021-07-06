const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const Student = require('./student.model');

const PaymentSchema = new Schema({
    student     : { type : Schema.Types.ObjectId, ref : Student, required : true },
    pay_mode    : { type : String, required : true},
    pay_day     : { type : Date, required : true},
    name_arrangement : { type : String, required : true},
    amount_day       : { type : Number, required : true},
    price            : { type : Number, required : true},
});

module.exports = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema); 
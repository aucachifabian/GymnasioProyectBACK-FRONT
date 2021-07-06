const mongoose      = require('mongoose');
const { Schema }    = mongoose;

const TrainingSchema = new Schema({
    type  : { type : String, required : true },
    name  : { type : String, required : true },
    video : { type : String, required : true },
    img   : { type : String, required : true },
});

module.exports = mongoose.models.training || mongoose.model('Training', TrainingSchema);

const mongoose = require('mongoose'); 
const URI = 'mongodb://localhost/ProyectoFinalPySW'; 

mongoose.connect(URI).then(
    resultado => console.log('BD conectado')
).catch(error => handleError(error));

module.exports = mongoose;

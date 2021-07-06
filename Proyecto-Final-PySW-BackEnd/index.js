var express = require('express');
var app = express();
const {mongoose} = require('./database')
const cors = require('cors');
const { urlencoded } = require('express');
//middlewares
app.use(express.json({limit:'1000mb',    extended : true
                  }));
app.use(urlencoded({
    limit : '1000mb',
    parameterLimit : 1000000000000000000000000,
    extended : true
}));
//app.use(cors({origin: '*'}));
app.use(cors({origin: 'http://localhost:4200'}));

//Cargamos el modulo de direccionamiento de rutas para puntos 
app.use('/api/arrangement'      , require('./routers/arrangement.router'));
app.use('/api/coach'            , require('./routers/coach.router'));
app.use('/api/assistance'       , require('./routers/assistence.router'));
app.use('/api/day/routine'      , require('./routers/day_routine.router'));
app.use('/api/payment'          , require('./routers/payment.router'));
app.use('/api/routine'          , require('./routers/routine.router'));
app.use('/api/student'          , require('./routers/student.router'));
app.use('/api/user'             , require('./routers/user.router'));
app.use('/api/training'         , require('./routers/training.router'));

//setting 
app.set('puerto', process.env.PORT || 3000);
 
//starting the server 
app.listen(app.get('puerto'), () => { 
    let d = new Date();
    console.log(d);
    console.log('Server started on port', app.get('puerto')); 
});
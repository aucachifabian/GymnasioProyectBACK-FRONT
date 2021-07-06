const jwt       = require('jsonwebtoken');
const authCtrl  = {};
const User      = require('../models/user.model');
    
authCtrl.verifyToken = async (req, res, next) => {
   if(!req.headers.authorization){
      res.json({ 
        'status':'0', 
        'msg': 'Unauthorized request.'
      });
    };

    console.log(req.headers.authorization.split(' '));
    console.log(req.headers.authorization.split(' ')[1]);
    console.log(req.headers.authorization.split(' ').length);

    var arrayTexto = req.headers.authorization.split(' ');
    var token = null;

    (arrayTexto.length >= 2) ? token = arrayTexto[1] : token = null;

    if(token == null){
      res.json({ 
        'status':'0', 
        'msg': 'Unauthorized request.'
      });

    } else {
        try { 
              const payload = jwt.verify(token, "secretkey");

              console.log(payload);
              
              req.userId  = payload._id;
              req.rol     = payload.rol;
              next();

        } catch (error) { 
              res.json({ 
                'status':'0', 
                'msg': 'Unauthorized request.'
          });
        };
    };
}

module.exports= authCtrl;
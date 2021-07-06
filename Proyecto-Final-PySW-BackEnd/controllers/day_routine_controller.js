const Routine = require('../models/day_routine.model');
const Arrangement = require('../models/arrangement.model')
const routineCtrl = {};

routineCtrl.createRoutine = async (req, res) => {
    var routine = new Routine(req.body);

    try {
        await routine.save();

        res.json({
           
            'status': '1',
            'msg': 'Routine saved.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Routine Error.'
        });
    };
}

routineCtrl.getRoutines = async (req, res) => {
    if( req.query.intensity == undefined && req.query.arrangement == undefined )
    {  
       const routine = await Routine.find().populate("routine").populate("arrangement");
       res.json(routine);
    }
    else
    { if( req.query.intensity != undefined && req.query.arrangement != undefined )
      {    
          routineCtrl.getByArrangementAndIntensity(req,res);
      }
      else
      {
        if( req.query.intensity != undefined )
        { 
           routineCtrl.getByIntensity(req,res);
        }
        else
        {
          routineCtrl.getByArrangement(req,res);
        }
      }
    }
}

routineCtrl.getByArrangementAndIntensity = async(req,res) =>{
    
    try{
        let arrangementRes = await Arrangement.findOne({name : req.query.arrangement});
        var routine = await Routine.find(
        {     $and: 
            [ 
             { intensity : req.query.intensity }, 
             { arrangement : arrangementRes._id } 
            ] 
        }).populate("arrangement");
         res.json(routine);   
      } catch(error)
      {
          res.json(
              {  "Status" : "0",
                 "msg"    : "result null" 
              }
          );
      }
}

routineCtrl.getByArrangement = async(req,res) =>{
    try{
        let arrangementRes = await Arrangement.findOne({name : req.query.arrangement});
        var routine = await Routine.find({arrangement : arrangementRes._id });
        res.json(routine);
      } catch(error)
      {
          res.json(
              {  "Status" : "0",
                 "msg"    : "No hay rutinas para el plan solicitado " 
              }
          );
      }
}

routineCtrl.getByIntensity = async(req,res) =>{
    try{
        var routine = await Routine.find({intensity : req.query.intensity });
        res.json(routine);
      } catch(error)
      {
          res.json(
              {  "Status" : "0",
                 "msg"    : "No hay resultados para :  Intensidad => " + req.query.intensity 
              }
          );
      }
}



routineCtrl.getRoutineParams = async (req, res) => {
    const routine = await Routine.findById(req.params.id).populate("routine").populate("arrangement");
    res.json(routine);
}

routineCtrl.deleteRoutine = async (req, res) => {
    try {
        await Routine.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Routine deleted.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Routine Error.'
        });
    };
}

routineCtrl.modifyRoutine = async (req, res) => {
    const routine = new Routine(req.body);

    try {
        await Routine.updateOne({ _id: req.body._id }, routine);
        res.json({
            'status': '1',
            'msg': 'Routine updated.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Routine Error.'
        })
    }
}


module.exports = routineCtrl;
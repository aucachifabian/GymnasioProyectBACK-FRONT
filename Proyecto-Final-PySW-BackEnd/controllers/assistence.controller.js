const Assistence = require('../models/assistence.model');
const studentCtrl = require('./student.controller');

const assistenceCtrl = {};

/****************************************************************/

/*the method creates an attendance if it is the first student.
otherwise update the assistance. also update amount_day in student*/

assistenceCtrl.createAssistence = async (req, res) => {
    var assistence = new Assistence(req.body);
    var firstStudent = await Assistence.findOne({day : req.body.day});

   // check valid 1 - to correct 0 - to arrangement defeated 
   var checkStudent = await studentCtrl.checkValidate(req,res);
   
    if(checkStudent == 0)
    {
        res.json({
            'status': '0',
             'msg': 'Asistencia no permitida, debe Abonar para un nuevo mes.',
           });
   } else{
        if(firstStudent == null || firstStudent == undefined)
        {   try {
                /*let date = new Date();
                console.log("1: "+assistence);

                date.setDate(assistence.day.getDate()+1);
                date.setMonth(assistence.day.getMonth());
                date.setFullYear(assistence.day.getFullYear());

                assistence.day = new Date();

                assistence.day.setDate(date.getDate());
                assistence.day.setMonth(date.getMonth());
                assistence.day.setFullYear(date.getFullYear());

                console.log("2: "+assistence);*/

                if(assistence.day.getDay()+1 == 7){
                    assistence.weekday = 0;
                    assistence.monthly = assistence.day.getMonth();
                }
                else {
                    assistence.weekday = assistence.day.getDay()+1;
                    assistence.monthly = assistence.day.getMonth();
                }
                

                await assistence.save();

                res.json({
                    'status': '1',
                    'msg': 'Se creo una nueva asistencia.',
                });
            } catch (error) {
                res.json({
                    'status': '0',
                    'msg': 'Assistence Error check the data'+error
                });
            };
        }
        else {
            firstStudent.student.push(req.body.student[0]);
            req.body = firstStudent;
            assistenceCtrl.modifyAssistence(req, res);
        };
   }
}

/****************************************************************/

assistenceCtrl.getAssistences = async (req, res) => {
    var assistence = await Assistence.find().exec();
    
    res.json(assistence);
}

/****************************************************************/

assistenceCtrl.getAssistenceParams = async (req, res) => {
    const assistence = await Assistence.findById(req.params.id);

    res.json(assistence);
}

/****************************************************************/

assistenceCtrl.deleteAssistence = async (req, res) => {
    try {
        await Assistence.deleteOne({ _id: req.params.id });

        res.json({
            'status': '1',
            'msg': 'Assistence save'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Assistence Error.'
        });
    };
}

/****************************************************************/

assistenceCtrl.modifyAssistence = async (req, res) => {
    const assistence = new Assistence(req.body);
    try {
        await Assistence.updateOne({ _id: req.body._id }, assistence);
        res.json({
            'status': '1',
            'msg': 'Assistence update',
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Assistence Error' + error
        });
    };
}

/****************************************************************/

assistenceCtrl.getAssistenceByIdStudent = async(req, res) => {

    const assistance = await Assistence.find({ student : req.params.student });
    
    if (assistance.length >= 1) {
        res.json({
            'status': '1',
            'assistance': assistance
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'No have assistance'
        });
    }
}

/****************************************************************/

assistenceCtrl.getAssistanceByWeekday = async(req, res) => {
    const assistance = await Assistence.find({ weekday : req.params.weekday });
    
    if (assistance.length >= 1) {
        res.json({
            'status': '1',
            'assistance': assistance
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'No have assistance'
        });
    }
}

/****************************************************************/

assistenceCtrl.getAssistanceByMonthly = async(req, res) => {
    const assistance = await Assistence.find({ monthly : req.params.monthly });

    if (assistance.length >= 1) {
        res.json({
            'status': '1',
            'assistance': assistance
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'No have assistance'
        });
    }
}

/****************************************************************/



module.exports = assistenceCtrl;

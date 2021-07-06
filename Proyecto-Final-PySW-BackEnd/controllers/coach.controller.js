const Coach = require('../models/coach.model');
const coachCtrl = {};

coachCtrl.createCoach = async(req, res) => {
    var coach = new Coach(req.body);

    try {
        await coach.save();

        res.json({
            'status': '1',
            'msg': 'Coach save.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Coach Error.'
        });
    };
}

coachCtrl.getCoachs = async(req, res) => {
    var coach = await Coach.find().exec();

    res.json(coach);
}


coachCtrl.getCoachParams = async(req, res) => {
    const coach = await Coach.findById(req.params.id);

    res.json(coach);
}

coachCtrl.deleteCoach = async(req, res) => {
    try {
        await Coach.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Coach deleted'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Coach Error'
        });
    };
}

coachCtrl.modifyCoach = async(req, res) => {
    const coach = new Coach(req.body);

    try {
        await Coach.updateOne({ _id: req.body._id }, coach);

        res.json({
            'status': '1',
            'msg': 'Coach updated'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Coach Error'
        });
    };
}


coachCtrl.getCoachByDni = async(req, res) => {
    const coach = await Coach.findOne({ dni: req.params.dni });

    if (coach != null) {
        res.json({
            'status': '1',
            'coach': coach
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'DNI is wrong'
        });
    }
}

module.exports = coachCtrl;
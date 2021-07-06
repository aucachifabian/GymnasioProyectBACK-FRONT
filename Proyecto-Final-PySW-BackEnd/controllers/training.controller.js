const Training      = require('../models/training.model');
const trainingCtrl  = {};

trainingCtrl.createTraining = async (req, res) => {
    var training = new Training(req.body);

    try {
        await training.save();

        res.json({
           
            'status': '1',
            'msg': 'Training saved.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Training Error.'+error
        });
    };
}

trainingCtrl.getTrainings = async (req, res) => {
    var training = await Training.find().exec();

    res.json(training);
}


trainingCtrl.getTrainingParams = async (req, res) => {
    const training = await Training.findById(req.params.id);

    res.json(training);
}

trainingCtrl.deleteTraining = async (req, res) => {
    try {
        await Training.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Training deleted'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Training Error.'
        });
    };
}

trainingCtrl.modifyTraining = async (req, res) => {
    const training = new Training(req.body);

    try {
        await Training.updateOne({ _id: req.body._id }, training);

        res.json({
            'status': '1',
            'msg': 'Training updated.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Training Error.'
        });
    };
}

module.exports = trainingCtrl;

const Arrangement = require('../models/arrangement.model');
const arrangementCtrl = {};

arrangementCtrl.createArrangement = async (req, res) => {
    var arrangement = new Arrangement(req.body);

    try {
        await arrangement.save();

        res.json({
            'status': '1',
            'msg': 'Arrangement saved.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Arrangement error.'
        });
    };
}

arrangementCtrl.getArrangements = async (req, res) => {
    var arrangement = await Arrangement.find().exec();

    res.json(arrangement);
}


arrangementCtrl.getArrangementParams = async (req, res) => {
    const arrangement = await Arrangement.findById(req.params.id);

    res.json(arrangement);
}

arrangementCtrl.deleteArrangement = async (req, res) => {
    try {
        await Arrangement.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Arrangement deleted'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Arrangement Error'
        });
    };
}

arrangementCtrl.modifyArrangement = async (req, res) => {
    const arrangement = new Arrangement(req.body);

    try {
        await Arrangement.updateOne({ _id: req.body._id }, arrangement);
        
        res.json({
            'status': '1',
            'msg': 'Arrangement updated.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Arrangement Error.'+error
        });
    };
}

module.exports = arrangementCtrl;

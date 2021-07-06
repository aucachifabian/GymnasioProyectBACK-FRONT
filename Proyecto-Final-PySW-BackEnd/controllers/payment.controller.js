const Payment = require('../models/payment.model');
const Student = require('../models/student.model');
const Arrangement = require('../models/arrangement.model');
const day_routineModel = require('../models/day_routine.model');
const paymentCtrl = {};

paymentCtrl.createPayment = async (req, res) => {
    try {
        var payment = new Payment(req.body.payment);
        var student = new Student();
        var arrangement = await Arrangement.findOne({ name : payment.name_arrangement });
        student = await Student.findById(payment.student);
        student.arrangement = arrangement;
        student.day_routine = new day_routineModel(req.body.routine);
        student.end_date = payment.pay_day;
        student.end_date.setDate(payment.pay_day.getDate() + 30);
        student.amount_day = 0;
        try {
            await Student.updateOne({ _id: student._id }, student);
            await payment.save();
            res.json({
                'status': '1',
                'msg': 'Payment saved and Student updated.',
                'student': student._id,
                'payment':payment._id,
                'end_date' : student.end_date
            });
        } catch (error) {
            res.json({
                'status': '0',
                'msg': 'Payment Error.'
            });
        };
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error en los parametros.'
        });
    }
}

paymentCtrl.getPayments = async (req, res) => {
    var payment = await Payment.find().exec();

    res.json(payment);
}


paymentCtrl.getPaymentParams = async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    res.json(payment);
}

paymentCtrl.deletePayment = async (req, res) => {
    try {
        await Payment.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Payment deleted.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Payment Error.'
        });
    };
}

paymentCtrl.modifyPayment = async (req, res) => {
    const payment = new Payment(req.body);

    try {
        await Payment.updateOne({ _id: req.body._id }, payment);

        res.json({
            'status': '1',
            'msg': 'Payment updated'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Payment Error.'
        });
    };
}


paymentCtrl.getPaymentByIdStudent = async(req, res) => {

    
    const payment = await Payment.find({ student : req.params.student });
 
    if (payment.length >= 1) {
        res.json({
            'status': '1',
            'payment': payment
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'No have payment'
        });
    }
}

module.exports = paymentCtrl;

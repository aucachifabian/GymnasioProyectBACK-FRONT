const paymentCtrl = require('../controllers/payment.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, paymentCtrl.createPayment);
router.get('/'      , autCtrl.verifyToken, paymentCtrl.getPayments);
router.get('/:id'   , autCtrl.verifyToken, paymentCtrl.getPaymentParams);
router.get('/id/:student'   , autCtrl.verifyToken, paymentCtrl.getPaymentByIdStudent);
router.delete('/:id', autCtrl.verifyToken, paymentCtrl.deletePayment);
router.put('/'   , autCtrl.verifyToken, paymentCtrl.modifyPayment);

module.exports = router;
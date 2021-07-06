const assistenceCtrl = require('../controllers/assistence.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, assistenceCtrl.createAssistence);
router.get('/'      , autCtrl.verifyToken, assistenceCtrl.getAssistences);
router.get('/:id'   , autCtrl.verifyToken, assistenceCtrl.getAssistenceParams);
router.get('/id/:student'   , autCtrl.verifyToken, assistenceCtrl.getAssistenceByIdStudent);
router.get('/day/:weekday'   , autCtrl.verifyToken, assistenceCtrl.getAssistanceByWeekday);
router.get('/monthly/:monthly'   , autCtrl.verifyToken, assistenceCtrl.getAssistanceByMonthly);
router.delete('/:id', autCtrl.verifyToken, assistenceCtrl.deleteAssistence);
router.put('/'   , autCtrl.verifyToken, assistenceCtrl.modifyAssistence);

module.exports = router;

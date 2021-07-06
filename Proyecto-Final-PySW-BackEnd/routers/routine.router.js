const routineCtrl = require('../controllers/routine.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, routineCtrl.createRoutine);
router.get('/'      , autCtrl.verifyToken, routineCtrl.getRoutines);
router.get('/:id'   , autCtrl.verifyToken, routineCtrl.getRoutineParams);
router.delete('/:id', autCtrl.verifyToken, routineCtrl.deleteRoutine);
router.put('/'   , autCtrl.verifyToken, routineCtrl.modifyRoutine);

module.exports = router;
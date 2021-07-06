const trainingCtrl = require('../controllers/training.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, trainingCtrl.createTraining);
router.get('/'      , trainingCtrl.getTrainings);
router.get('/:id'   , trainingCtrl.getTrainingParams);
router.delete('/:id', autCtrl.verifyToken, trainingCtrl.deleteTraining);
router.put('/'   , autCtrl.verifyToken, trainingCtrl.modifyTraining);

module.exports = router;

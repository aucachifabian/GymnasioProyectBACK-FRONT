const coachCtrl = require('../controllers/coach.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/', autCtrl.verifyToken, coachCtrl.createCoach);
router.get('/',  coachCtrl.getCoachs);
router.get('/:id',  coachCtrl.getCoachParams);
router.get('/dni/:dni', autCtrl.verifyToken, coachCtrl.getCoachByDni);
router.delete('/:id', autCtrl.verifyToken, coachCtrl.deleteCoach);
router.put('/', autCtrl.verifyToken, coachCtrl.modifyCoach);

module.exports = router;
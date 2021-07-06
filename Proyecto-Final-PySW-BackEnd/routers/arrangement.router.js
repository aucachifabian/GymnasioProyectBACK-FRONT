const arrangementCtrl = require('../controllers/arrangement.controller');
const autCtrl = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, arrangementCtrl.createArrangement);
router.get('/'      , arrangementCtrl.getArrangements);
router.get('/:id'   , arrangementCtrl.getArrangementParams);
router.delete('/:id', autCtrl.verifyToken, arrangementCtrl.deleteArrangement);
router.put('/'   , autCtrl.verifyToken, arrangementCtrl.modifyArrangement);

module.exports = router;
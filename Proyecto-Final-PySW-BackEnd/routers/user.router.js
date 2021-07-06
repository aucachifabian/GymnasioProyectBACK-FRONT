const userCtrl = require('../controllers/user.controller');
const autCtrl = require('../controllers/auth.controller');


const express = require('express');
const router = express.Router();

router.post('/'     , autCtrl.verifyToken, userCtrl.createUser);
router.get('/'      , autCtrl.verifyToken, userCtrl.getUsers);
router.post('/login' , userCtrl.loginUsuario);
router.get('/:id'   , autCtrl.verifyToken, userCtrl.getUserParams);
router.delete('/:id', autCtrl.verifyToken, userCtrl.deleteUser);
router.put('/'   , autCtrl.verifyToken, userCtrl.modifyUser);

module.exports = router;
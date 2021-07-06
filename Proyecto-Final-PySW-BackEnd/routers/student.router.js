const studentCtrl = require('../controllers/student.controller');
const autCtrl = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();

router.post('/', autCtrl.verifyToken, studentCtrl.createStudent);
router.get('/', autCtrl.verifyToken, studentCtrl.getStudents);
router.get('/:id', autCtrl.verifyToken, studentCtrl.getStudentParams);
router.get('/dni/:dni', autCtrl.verifyToken, studentCtrl.getStudentByDni);
router.delete('/:id', autCtrl.verifyToken, studentCtrl.deleteStudent);
router.put('/', autCtrl.verifyToken, studentCtrl.modifyStudent);

module.exports = router;
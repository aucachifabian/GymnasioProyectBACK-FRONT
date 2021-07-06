const Student = require('../models/student.model');
const studentCtrl = {};


studentCtrl.createStudent = async(req, res) => {
    if (req.rol == "coach") {
        var alum = new Student(req.body);
        console.log(alum)
        try {
            await alum.save();

            res.json({

                'status': '1',
                'msg': 'Student saved.'
            });
        } catch (error) {
            res.json({
                'status': '0',
                'msg': 'Student Error' + error
            });
        };
    } else {
        res.json({
            'status': '0',
            'msg': 'No tiene permiso de acceder a este modulo'
        })
    }
}

studentCtrl.getStudents = async(req, res) => {
    var alum = await Student.find().exec();

    res.json(alum);
}


studentCtrl.getStudentParams = async(req, res) => {
    const student = await Student.findById(req.params.id).populate("arrangement").populate("day_routine");

    res.json(student);
}

studentCtrl.deleteStudent = async(req, res) => {
    try {
        await Student.deleteOne({ _id: req.params.id });

        res.json({
            status: '1',
            msg: 'Student deleted'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Student Error.'
        });
    };
}

studentCtrl.modifyStudent = async(req, res) => {
    const alum = new Student(req.body);

    try {
        await Student.updateOne({ _id: req.body._id }, alum);

        res.json({
            'status': '1',
            'msg': 'Student updated.'
        });
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Student Error.'
        });
    };
}

studentCtrl.checkValidate = async(req, res) => {
    let id = req.body.student[0];
    const student = await Student.findById(id);

    if (new Date(req.body.day) <= student.end_date) {
        student.amount_day = student.amount_day + 1;
        await Student.updateOne({ _id: student._id }, student);
        
        return 1;
    } else {
        return 0;
    }
}


studentCtrl.getStudentByDni = async(req, res) => {
    const student = await Student.findOne({ dni: req.params.dni }).populate("arrangement").populate("day_routine");

    if (student != null) {
        res.json({
            'status': '1',
            'student': student
        });
    } else {
        res.json({
            'status': '0',
            'msg': 'DNI is wrong'
        });
    }
}



module.exports = studentCtrl;
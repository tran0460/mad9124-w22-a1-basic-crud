const { students, courses } = require('../data/index.js')
const validateStudentId = (req,res, next) => {
    const id = parseInt(req.params.studentId)
    const index = students.findIndex(student => student.id === id)
    if (index < 0) {
        res.status(404).json({
        errors: [
        {
            status: '404',
            title: 'Resource does not exist',
            description: `We could not find a student with id: ${id}`
        }
        ]
    })
    }
    req.studentIndex = index
    next()
}

module.exports = { validateStudentId }

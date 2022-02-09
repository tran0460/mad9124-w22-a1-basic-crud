const express = require('express');
const { students } = require('../data/index.js')
const { validateStudentId } = require('../middleware/validateStudentId')
const studentRouter = express.Router();

studentRouter.use('/:studentId', validateStudentId)

studentRouter.get("/", (req, res) => {
    res.json({ data: students.map((student) => formatResponseData("students", student)) });
});

studentRouter.get("/:studentId", (req, res) => {
    const id = parseInt(req.params.studentId);
    res.json({ data: formatResponseData("students", students[req.studentIndex]) });
});

studentRouter.post("/", (req, res) => {
    const { data } = req.body;
    if (data?.type === "students") {
        const newStudent = {
            ...data.attributes,
            id: Date.now(),
        };
        students.push(newStudent);
        res.status(201).json({ data: formatResponseData("students", newStudent) });
    } else {
        res.status(400).json({
        errors: [
        {
            status: "400",
            title: "schema validation error",
            detail: `Expected resource type to be 'students', got '${data?.type}'`,
            source: {
            pointer: "/data/type",
            },
        },
        ],
    });
    }
});

studentRouter.put('/:studentId', (req, res) => {
    const updatedStudent = {
        ...req.body?.data?.attributes,
        id: parseInt(req.params.studentId)
    }
    students[req.studentIndex] = updatedStudent
    res.json({data: formatResponseData('students', updatedStudent)})
})

studentRouter.patch("/:studentId", (req, res) => {
    const id = parseInt(req.params.studentId);
    
    // process request
    const updatedStudent = Object.assign(
        {},
        students[req.studentIndex],
        req.body?.data?.attributes,
        { id }
    );
    students[req.studentIndex] = updatedStudent;
    res.json({ data: formatResponseData("students", updatedStudent) });
});

studentRouter.delete('/:studentId', (req, res) => {
    const deletedStudent = students.splice(req.studentIndex, 1)[0]
    res.json({
        data: formatResponseData('students', deletedStudent),
        meta: {message: `Student with id: ${req.params.studentId} successfully deleted.`}
    })
})

/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'cars'
 * @param {Object} resource An instance object from that collection
 * @returns
 */
function formatResponseData(type, resource) {
    const { id, ...attributes } = resource;
    return { type, id, attributes };
}

module.exports = studentRouter;
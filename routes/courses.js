const express = require('express');
const { courses } = require('../data/index.js')
const { validateCourseId } = require('../middleware/validateId')
const courseRouter = express.Router();

courseRouter.use('/:courseId', validateCourseId)
console.log(courses)

courseRouter.get("/", (req, res) => {
    res.json({ data: courses.map((course) => formatResponseData("courses", course)) });
});

courseRouter.get("/:courseId", (req, res) => {
    const id = parseInt(req.params.courseId);
    res.json({ data: formatResponseData("courses", courses[req.courseIndex]) });
});

courseRouter.post("/", (req, res) => {
    const { data } = req.body;
    if (data?.type === "courses") {
        const newCourse = {
            ...data.attributes,
            id: Date.now(),
        };
        courses.push(newCourse);
        res.status(201).json({ data: formatResponseData("courses", newCourse) });
    } else {
        res.status(400).json({
        errors: [
        {
            status: "400",
            title: "schema validation error",
            detail: `Expected resource type to be 'courses', got '${data?.type}'`,
            source: {
            pointer: "/data/type",
            },
        },
        ],
    });
    }
});

courseRouter.put('/:courseId', (req, res) => {
    const updatedCourse = {
        ...req.body?.data?.attributes,
        id: parseInt(req.params.courseId)
    }
    courses[req.courseIndex] = updatedCourse
    res.json({data: formatResponseData('courses', updatedCourse)})
})

courseRouter.patch("/:courseId", (req, res) => {
    const id = parseInt(req.params.courseId);
    
    // process request
    const updatedCourse = Object.assign(
        {},
        courses[req.courseIndex],
        req.body?.data?.attributes,
        { id }
    );
    courses[req.courseIndex] = updatedCourse;
    res.json({ data: formatResponseData("courses", updatedCourse) });
});

courseRouter.delete('/:courseId', (req, res) => {
    const deletedCourse = courses.splice(req.courseIndex, 1)[0]
    res.json({
        data: formatResponseData('courses', deletedCourse),
        meta: {message: `Course with id: ${req.params.courseId} successfully deleted.`}
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

module.exports = courseRouter;
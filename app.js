'use strict'
// load dependencies
// const morgan = require('morgan')
const express = require('express')
const studentRouter = require('./routes/students')
const courseRouter = require('./routes/courses')

// create the express app
const app = express()

// configure express middleware
// app.use(morgan('tiny'))
app.use(express.json())

// define routes
app.use('/api/students', studentRouter) // Use to handle any route that matches /api/cars
app.use('/api/courses', courseRouter) // Use to handle any route that matches /api/cars

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port}...`))

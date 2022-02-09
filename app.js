'use strict'
// load dependencies
const express = require('express')
const studentRouter = require('./routes/students')
const courseRouter = require('./routes/courses')

const app = express()

app.use(express.json())

// define routes
app.use('/api/students', studentRouter) 
app.use('/api/courses', courseRouter) 

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port}...`))

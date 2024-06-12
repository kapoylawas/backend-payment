//import express
const express = require('express')

//import CORS
const cors = require('cors')

//import bodyParser
const bodyParser = require('body-parser')

//init app
const app = express()

//import router
const router = require('./routes')

//use cors
app.use(cors())

//use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define port
const port = 3000;

//route
app.get('/', (req, res) => {
    res.send('API PAYMENT')
})

app.use('/api', router)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
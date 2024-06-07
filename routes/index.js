//import express
const express = require('express')

//init express router
const router = express.Router();

//import validate register
const { validateRegister } = require('../utils/validators/auth');

//import register controller
const registerController = require('../controllers/RegisterController');

//define route for register
router.post('/register', validateRegister, registerController.register);

//export router
module.exports = router
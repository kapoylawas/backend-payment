//import express
const express = require('express')

//init express router
const router = express.Router();

//import validate register
const { validateRegister, validateLogin } = require('../utils/validators/auth');

//import register controller
const registerController = require('../controllers/RegisterController');

const loginController = require('../controllers/LoginController');

//import login controller

//define route for register
router.post('/register', validateRegister, registerController.register);

//define route for login
router.post('/login', validateLogin, loginController.login);

//export router
module.exports = router
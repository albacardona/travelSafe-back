const express    = require('express')
const authRoutes = express.Router()

const UserController = require('../../controllers/user')

//* SIGNUP ROUTE
authRoutes.post('/signup', UserController.signup);

//* LOGIN ROUTE
authRoutes.post('/login', UserController.login);

//* LOGOUT ROUTE
authRoutes.post('/logout', UserController.logout);

//* LOGGEDIN ROUTE
authRoutes.get('/loggedin', UserController.loggedin);

module.exports = authRoutes;
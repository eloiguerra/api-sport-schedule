const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/register', UserController.store);
routes.post('/login', UserController.login);

module.exports = routes;

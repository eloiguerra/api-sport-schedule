const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const FriendController = require('./controllers/FriendController');

const auth = require('./middlewares/auth');

routes.post('/register', UserController.store);
routes.post('/login', UserController.login);
routes.get('/users/:full_name', auth, UserController.read);

routes.post('/friend/:id', auth, FriendController.store);

module.exports = routes;

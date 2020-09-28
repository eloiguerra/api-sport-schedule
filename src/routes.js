const express = require('express');
const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./controllers/UserController');
const FriendController = require('./controllers/FriendController');
const ImageController = require('./controllers/ImageController');

const auth = require('./middlewares/auth');

routes.post('/register', UserController.store);
routes.post('/login', UserController.login);
routes.get('/users', auth, UserController.read);
routes.get('/users/:full_name', auth, UserController.readByName);
routes.put('/users', auth, UserController.update);

routes.get('/visit/:id', auth, UserController.readById);

// routes.get('/friends/:id', auth, FriendController.read);
// routes.post('/friends/:id', auth, FriendController.store);

routes.post('/postProfilePhoto',
  multer(multerConfig).single('file'),
  ImageController.profileStore
);



module.exports = routes;

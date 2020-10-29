const express = require('express');
const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./controllers/UserController');
const FriendController = require('./controllers/FriendController');
const ImageController = require('./controllers/ImageController');
const SportController = require('./controllers/SportController');
const PublicationController = require('./controllers/PublicationController');
const ChatController = require('./controllers/ChatController');
const GameController = require('./controllers/GameController');

const auth = require('./middlewares/auth');

routes.post('/register', UserController.store);
routes.post('/login', UserController.login);

routes.get('/users', auth, UserController.read);
routes.get('/users/:full_name', auth, UserController.readByName);
routes.put('/users', auth, UserController.update);

routes.get('/visit/:id', auth, UserController.readById);

routes.post('/friends', auth, FriendController.store);
routes.get('/friends', auth, FriendController.read);
routes.get('/friends/:id', auth, FriendController.readByFriend);
routes.put('/friends', auth, FriendController.update);

//Se der tempo, lembrar de fazer o login de adm pra essa rota
routes.post('/sports', SportController.create);
routes.get('/sports', SportController.read);

routes.post('/publications', auth, PublicationController.create);
routes.get('/publications', auth, PublicationController.read);
routes.post('/publications/comments', auth, PublicationController.createComment);

routes.get('/friendsPublications', auth, PublicationController.readByFriends);

routes.post('/chat', auth, ChatController.create);
routes.get('/chat/:friend', auth, ChatController.read);

routes.post('/games', auth, GameController.create);
routes.get('/games', auth, GameController.read);

routes.post('/files',
  multer(multerConfig).single('file'),
  ImageController.store
);

routes.put('/changeProfilePhoto',
  auth,
  multer(multerConfig).single('file'),
  UserController.updateProfilePhoto
);

module.exports = routes;

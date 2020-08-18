const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const FriendController = require('./controllers/FriendController');

//Rotas do usuário
routes.post('/register', UserController.store);
routes.post('/login', UserController.login);

/* Rotas de amizades em desenvolvimento, pergunta pro prof qual ele
acha mais seguro. Usar o ID ou o email da pessoa, mesmo sendo óbvio*/
// routes.post('/friend/:id', FriendController.store);

//Rotas de publicações
routes.post('/publications', );
module.exports = routes;

require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const routes = require('./routes');

const chat = require('./websockets/chat');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use('/', routes);

chat(io);

server.listen(process.env.PORT || 3333);

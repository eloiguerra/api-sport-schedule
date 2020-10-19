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

const allowedOrigins = [
  'http://localhost:3000',
  'http://yourapp.com'
];

app.use(cors({
  origin: (origin, callback) => {

    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use('/', routes);

chat(io);

server.listen(process.env.PORT || 3333);

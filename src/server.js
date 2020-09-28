require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use('/', routes);

app.listen(process.env.PORT || 3333);

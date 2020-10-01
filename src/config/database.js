const moongose = require('mongoose');

moongose.connect(
  process.env.DB_CONNECTION,
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  }
)

module.exports = moongose;

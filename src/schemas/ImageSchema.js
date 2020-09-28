  const moongose = require('../config/database');
const Schema = moongose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  key: {
    type: String,
  },
  url: {
    type: String,
  },
})

module.exports = UserSchema;

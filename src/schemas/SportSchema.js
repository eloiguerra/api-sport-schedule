const moongose = require('../config/database');

const Schema = moongose.Schema

const SportSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = SportSchema;

const moongose = require('mongoose');

const Schema = moongose.Schema

const SportSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = SportSchema;

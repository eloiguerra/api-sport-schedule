const moongose = require('mongoose');

const Schema = moongose.Schema

const SportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = SportSchema;

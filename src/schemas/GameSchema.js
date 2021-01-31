const moongose = require('mongoose');
const Schema = moongose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  sport: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  owner: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = GameSchema;

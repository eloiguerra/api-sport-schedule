const moongose = require('mongoose');
const Schema = moongose.Schema;

const Message = new Schema({
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
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

module.exports = Message;

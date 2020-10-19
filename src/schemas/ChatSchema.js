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
});

const Chat = new Schema({
  chat_id: {
    type: moongose.Schema.Types.ObjectId,
  },
  from: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [Message],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Chat;

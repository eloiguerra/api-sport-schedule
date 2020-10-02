const moongose = require('mongoose');
const Schema = moongose.Schema;

const FriendSchema = new Schema({
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend_request: {
    type: Boolean
  }
})

module.exports = FriendSchema;

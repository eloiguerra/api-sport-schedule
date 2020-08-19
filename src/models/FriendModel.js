const moongose = require('../config/database');
const FriendSchema = require('../schemas/FriendSchema');

const Friend = moongose.model('Friend', FriendSchema);

module.exports = Friend;

const moongose = require('../config/database');
const ChatSchema = require('../schemas/ChatSchema');

const Chat = moongose.model('Chat', ChatSchema);

module.exports = Chat;


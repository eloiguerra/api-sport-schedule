const moongose = require('../config/database');
const UserSchema = require('../schemas/UserSchema');

const User = moongose.model('User', UserSchema);

module.exports = User;


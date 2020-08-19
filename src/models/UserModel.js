const moongose = require('../config/database');
const UserSchema = require('../schemas/UserSchema');

const User = moongose.model('Users', UserSchema);

module.exports = User;


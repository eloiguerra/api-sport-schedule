const database = require('../config/database');
const UserSchema = require('../schemas/UserSchema');

const User = database.model('Users', UserSchema);

module.exports = User;


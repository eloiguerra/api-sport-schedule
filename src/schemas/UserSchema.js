const database = require('../config/database');
const Schema = database.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_photo: {
    type: String,
    default: null
  },
  profile_type: {
    type: String,
    default: 'default'
  },
  description: {
    type: String,
    required: false
  }
})

module.exports = UserSchema;

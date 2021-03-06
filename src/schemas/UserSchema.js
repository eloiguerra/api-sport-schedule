const moongose = require('mongoose');
const Schema = moongose.Schema;

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
    default: null
  },
  password: {
    type: String,
    required: true
  },
  friendship: [{
    type: moongose.Schema.Types.ObjectId,
    ref: 'Friend',
  }],
  profile_photo: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  profile_type: {
    type: String,
    default: 'default'
  },
  description: {
    type: String,
    default: null
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

module.exports = UserSchema;

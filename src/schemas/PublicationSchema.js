const moongose = require('mongoose');
const Schema = moongose.Schema;

const PublicationSchema = new Schema({
  image: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Image',
    default: null
  },
  description: {
    type: String,
    default: null
  },
  sport: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Sport',
    require: true
  },
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  reactions: [{
    like: {
      type: Number,
    },
    angry: {
      type: Number
    },
    want_play: {
      type: Number
    }
  }],
  comments: [{
    description: {
      type: String
    },
    owner: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = PublicationSchema;

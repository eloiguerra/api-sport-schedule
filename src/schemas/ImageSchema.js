const moongose = require('mongoose');
const Schema = moongose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  key: {
    type: String,
  },
  url: {
    type: String,
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

module.exports = ImageSchema;

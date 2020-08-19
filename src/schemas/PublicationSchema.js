const moongose = require('../config/database');

const Schema = moongose.Schema;

const PublicationSchema = new Schema({
  image: {
    type: String,
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
})

module.exports = PublicationSchema;

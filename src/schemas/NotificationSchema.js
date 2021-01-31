const moongose = require('mongoose');
const Schema = moongose.Schema;

const NotificationSchema= new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: Number,
    enums: [
        1,    //'Solicitação de amizade',
    ]
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

module.exports = NotificationSchema;

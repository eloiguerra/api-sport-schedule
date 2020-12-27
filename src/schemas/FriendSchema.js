const moongose = require('mongoose');
const Schema = moongose.Schema;

const FriendSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Number,
    enums: [
        0,    //'Adicionar amigo',
        1,    //'Enviado',
        2,    //'Pendente',
        3,    //'Já são amigos'
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

module.exports = FriendSchema;

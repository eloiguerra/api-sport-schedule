const Chat = require('../models/ChatModel');
const Message = require('../models/MessageModel');

module.exports = {
  async create(req, res){
    try{
      const {_id} = req.user;
      const {message, friend} =  req.body;

      const chat = await Chat.findOne({
        $or:[
          {$and: [{from: friend}, {to: _id}]},
          {$and: [{from: _id}, {to: friend}]}
        ]
      });

      if(chat){
        await chat.messages.push({
          user:_id,
          message
        });

        chat.save();

        return res.send(201).send(chat.messages);
      }
      else{
        const createdChat = await Chat.create({
          from: _id,
          to: friend,
          messages: {
            user: _id,
            message
          }
        });

        return res.status(201).send(createdChat);
      }
    }
    catch(err){
      console.log(err);
    }
  },

  async read(req, res){
    const {_id} = req.user;
    const {friend} =  req.params;

    const chat = await Chat.findOne({
      $or:[
        {$and: [{from: friend}, {to: _id}]},
        {$and: [{from: _id}, {to: friend}]}
      ]
    });

    if(chat){
      return res.send(chat);
    }
  }
}

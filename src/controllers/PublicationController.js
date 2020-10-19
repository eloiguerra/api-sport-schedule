const Publication = require('../models/PublicationModel');
const Friend = require('../models/FriendModel');

module.exports = {
  async create(req, res){
    try{
      const {_id} = req.user;
      const {description, sport, image} = req.body;

      const publication = await Publication.create({
        user: _id,
        sport,
        description,
        image
      });

      return res.status(201).send(publication);
    }
    catch(err){
      console.log(err);
    }
  },

  async read(req, res){
    try{
      const publications = await Publication.find().populate();

      return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  },

  async readByFriends(req, res){
    try{
      const {_id} = req.user;
      const {page} = req.query;
      const {limit} = req.query;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      let friends = [];

      const friendship = await Friend.find({
        $and:[
          {$or:[
            {$and: [{friend: {$ne: _id}}, {user: _id}]},
            {$and: [{friend: _id}, {user: {$ne: _id}}]},
          ]},
          {friend_request: false}
        ]
      });

      friendship.map(item => {
        if(item.user != _id)
          friends.push(item.user);
        else
          friends.push(item.friend);
      });

      const publications = await Publication.find({
        user: {$in: friends}
      })
      .limit(endIndex).skip(startIndex)
      .populate({
        path: 'user',
        populate: {path: 'profile_photo'}
      })
      .populate('sport')
      .populate('image', 'url')

      if(publications.length)
        return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  }
}

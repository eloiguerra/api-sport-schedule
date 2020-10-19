const Friend = require('../models/FriendModel');

module.exports = {
  async store(req, res){
    const user = req.user._id;
    const friend = req.body.id;

    const friendship = await Friend.findOne({user, friend});
    if(friendship){
      if(friendship.friend_request){
        return res.status(400).send({message: 'Pending friend request'});
      }
      else{
        return res.status(400).send({message: 'You are already friends'})
      }
    }
    else {
      const result = await Friend.create({
        user,
        friend,
        friend_request: true,
      });

      return res.status(201).send(result);
    }
  },

  async read(req, res){
    try{
      const {_id} = req.user;
      let friends = [];

      const friendship = await Friend.find({
        $and:[
          {friend_request: false},
          {$or: [
            {user: _id},
            {friend: _id}
          ]}
        ]
      })
      .populate({
        path: 'user',
        populate: {
          path: 'profile_photo',
          select: 'url'
        },
        select: 'full_name'
      })
      .populate({
        path: 'friend',
        populate: {
          path: 'profile_photo',
          select: 'url'
        },
        select: 'full_name'
      })

      friendship.map(item => {
        if(item.user === _id)
          friends.push(item.user);
        else
          friends.push(item.friend);
      });

      return res.status(200).send(friends);
    }
    catch(err){
      console.log(err);
    }
  },

  async readByFriend(req, res){
    try{
      const {_id} = req.user;
      const {id} = req.params;

      const friendship = await Friend.findOne({
        $or:[
          {$and: [{friend: id}, {user: _id}]},
          {$and: [{friend: _id}, {user: id}]}
        ]
      });

      return res.status(200).send(friendship);
    }
    catch(err){
      console.log(err);
    }
  },

  async update(req, res){
    try{
      const {id} = req.body;

      const friendship = await Friend.findByIdAndUpdate(
        id,
        {friend_request: false}
      );

      return res.status(200).send(friendship);
    }
    catch(err){
      console.log(err);
    }
  }
}

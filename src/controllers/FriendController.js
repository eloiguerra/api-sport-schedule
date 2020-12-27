const Friend = require('../models/FriendModel');
const User = require('../models/UserModel');

module.exports = {
  async store(req, res){
    const user = req.user._id;
    const friend = req.body.id;

    /* const requester = await Friend.findOneAndUpdate(
        { requester: user, recipient: friend },
        { $set: { status: 1 }},
        { upsert: true, new: true }
    )

    const requested = await Friend.findOneAndUpdate(
        { recipient: user, requester: friend },
        { $set: { status: 2 }},
        { upsert: true, new: true }
    ) */

    const requested = await Friend.findOneAndUpdate(
      { recipient: user, requester: friend },
      { $set: { status: 1 }},
      { upsert: true, new: true }
    )
    const requester = await Friend.findOneAndUpdate(
      { requester: user, recipient: friend },
      { $set: { status: 2 }},
      { upsert: true, new: true }
    )

    const updateRequester = await User.findOneAndUpdate(
      { _id: user },
      { $push: { friendship: requester._id }}
    )
    const updateRequested = await User.findOneAndUpdate(
      { _id: friend },
      { $push: { friendship: requested._id }}
    )

    return res.status(201).send(updateRequested);
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

      friendship.filter(item => {
        item.user || item.friend !== _id && friends.push(item);
      });

      friendship.map(item => {
        if(item.user === _id){
          friends.push(item.friend);
        }
        else{
          friends.push(item.user);
        }
      });

      console.log(friends);
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
      const {_id} = req.user;

      await Friend.findOneAndUpdate(
        { requester: id, recipient: _id },
        { $set: { status: 3 }}
      )
      await Friend.findOneAndUpdate(
        { recipient: id, requester: _id },
        { $set: { status: 3 }}
      )

      return res.status(200).send({message: 'Accepted'});
    }
    catch(err){
      console.log(err);
    }
  }
}

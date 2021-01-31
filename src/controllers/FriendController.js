const Friend = require('../models/FriendModel');
const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');

module.exports = {
  async store(req, res){
    const user = req.user._id;
    const friend = req.body.id;

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

    const notification = await Notification.create({
      requester: user,
      recipient: friend,
      type: 1
    })

    return res.status(201).send(requested);
  },

  async read(req, res){
    try{
      const {_id} = req.user;

      let friends = [];

      const {friendship} = await User.findById(_id)
        .populate({
          path: 'friendship',
          select: '_id requester recipient',
          populate: {
            path: 'requester recipient',
            select: 'profile_photo, full_name',
            populate: {
              path: 'profile_photo',
              select: 'url'
            }
          },
          match: {status: {$eq: 3}}
        })

      friendship.map(item => {
        item.requester_id == _id
        ? friends.push(item.requester)
        : friends.push(item.recipient)
      })

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

      await Notification.findOneAndDelete({
        recipient: _id,
        requester: id,
        type: 1
      })
      return res.status(200).send({message: 'Success'});
    }
    catch(err){
      console.log(err);
    }
  },

  async delete(req, res){
    try {
      const friend = req.params.id;
      const user = req.user._id;

      const requested = await Friend.findOneAndUpdate(
        { recipient: user, requester: friend },
        { $set: { status: 0 }},
      )
      const requester = await Friend.findOneAndUpdate(
        { requester: user, recipient: friend },
        { $set: { status: 0 }},
      )

      const updateRequester = await User.findOneAndUpdate(
        { _id: user },
        { $push: { friendship: requester._id }}
      )
      const updateRequested = await User.findOneAndUpdate(
        { _id: friend },
        { $push: { friendship: requested._id }}
      )
      .populate({
        path: 'friendship',
        match: {_id: {$eq: friend}}
      });

      await Notification.findOneAndDelete({
        recipient: user,
        requester: friend,
        type: 1
      })

      return res.send(updateRequested);
    }
    catch(err){
      console.log(err);
    }
  }
}

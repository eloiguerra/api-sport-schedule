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
      const {id} = req.params;

      const friendship = await Friend.findOne({
        $or:[
          {friend: id}, {user: id}
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

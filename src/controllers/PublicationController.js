const Publication = require('../models/PublicationModel');
const Friend = require('../models/FriendModel');

module.exports = {
  async create(req, res){
    try{
      const {_id} = req.user;
      const {sport} = req.body;

      const description = req.body.description || null;
      const image = req.body.image || null;

      const publication = await Publication.create({
        user: _id,
        sport,
        description,
        image
      });

      return res.status(201).send(publication);
    }
    catch(err){
      return res.send(err);
    }
  },

  async read(req, res){
    try{
      const publications = await Publication.find().populate();

      return res.status(200).send(publications);
    }
    catch(err){
      return res.send(err);
    }
  },

  async createComment(req, res){
    try{
      const {comment, publication} = req.body;
      const {_id} = req.user;

      const post = await Publication
      .findById(publication)
      .populate({
        path: 'user',
        populate: {path: 'profile_photo'}
      })

      .populate('image', 'url')
      .populate('sport')

      await post.comments.push({
        description: comment,
        owner: _id
      })

      await post.populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      }).execPopulate();

      post.save();
      return res.status(201).send(post);
    }
    catch(err){
      return res.send(err);
    }
  },

  async createLike(req, res){
    try{
      const {publication} = req.body;
      const {_id} = req.user;

      const post = await Publication
      .findById(publication)
      .populate({
        path: 'user',
        populate: {path: 'profile_photo'}
      })
      .populate('image', 'url')
      .populate('sport')

      await post.likes.push({
        owner: _id
      })

      await post.populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      })
      .execPopulate();

      post.save();
      return res.status(201).send(post);

    }
    catch(err){
      return res.send(err);
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
        select: 'full_name profile_photo',
        populate: {
          path: 'profile_photo',
          select: 'url',
        }
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
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



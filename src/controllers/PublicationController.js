const Publication = require('../models/PublicationModel');
const Friend = require('../models/FriendModel');
const User = require('../models/UserModel');

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
     /*  .populate({
        path: 'likes',
        populate: {
          path: 'owner',
          select: 'full_name profile_photo',
          populate: {
            path: 'profile_photo',
            select: 'url'
          }
        }
      }) */.execPopulate();

      post.save();
      return res.status(201).send(post);
    }
    catch(err){
      return res.send(err);
    }
  },

  /* async createLike(req, res){
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
  }, */

  async readByFriends(req, res){
    try{
      const {_id} = req.user;
      const {page} = req.query;
      const {limit} = req.query;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const friends = [];

      const {friendship} = await User.findById(_id)
        .populate({
          path: 'friendship',
          select: '_id requester recipient',
          populate: {
            path: 'requester recipient',
            model: 'User',
            select: '_id',
          },
          match: {status: {$eq: 3}}
        })

      friendship.map(item => {
        item.requester_id == _id
        ? friends.push(item.requester._id)
        : friends.push(item.recipient._id)
      })

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
      .sort({created_at: "desc"})

      return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  },

  async readByFriend(req, res){
    try{
      const {id} = req.params;
      const {page} = req.query;
      const {limit} = req.query;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const publications = await Publication.find({
        user: id
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

      return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  },

  async readByOwner(req, res){
    try{
      const {_id} = req.user;
      const {page} = req.query;
      const {limit} = req.query;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const publications = await Publication.find({user: _id})
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
      .sort({created_at: "desc"})

      return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  }
}



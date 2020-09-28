const Friend = require('../models/FriendModel');

module.exports = {
  async store(req, res){
    const {email} = req.body;
  },

  async read(req, res){
    try{
      const {id} = req.params;

      user = await Friend.findById(id);

      return res.status(201).send(user);
    }
    catch(err){
      console.log(err);
    }
  },
}

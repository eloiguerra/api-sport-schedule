const Image = require('../models/ImageModel');
const User = require('../models/UserModel');

module.exports = {
  async store(req, res){
    try{
      const {originalname: name, size, filename: key} = req.file;
      const image = await Image.create({
        name,
        size,
        key,
        url: `http://localhost:3333/files/${key}`
      });

      return res.status(201).send(image);
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  },

  async delete(req, res){
    try{
      const {id} = req.file;

      const image = await Image.findByIdAndDelete(id);

      return res.status(200).send(image);
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  },

  async update(req, res){
    try{
      const session = await Image.startSession();
      const {_id} = req.user;
      const {originalname: name, size, filename: key} = req.file;

      await session.withTransaction(async () => {
        let new_photo = await Image.create({
          name,
          size,
          key,
          url: `http://localhost:3333/files/${key}`
        });

        let {profile_photo} = await User.findById(_id).select('profile_photo');
        if(!profile_photo === "5f78f89f85cf6047a144f9fb"){
          await findByIdAndDelete(profile_photo);
        }

        await User.findByIdAndUpdate(_id, {profile_photo: new_photo._id});

        return res.status(201).send({});
      });
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  }
}

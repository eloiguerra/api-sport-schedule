const User = require('../models/UserModel');
const Image = require('../models/ImageModel');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
  updateValidation
} = require('../validations/user');
const bcrypt = require('bcryptjs');

module.exports = {
  async store(req, res){
    if(registerValidation(req.body))
      return res.status(400).send({error: 'Invalid data'});

    try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const {email, full_name} = req.body;

      if(await User.findOne({email})){
        return res.status(400).send({error: 'User Already Exists'})
      }
      else{
        const user = await User.create({
          email,
          password: hashedPassword,
          full_name,
          profile_photo: "5f8e17dbe42f0b70b54c82e1"
        });
        return res.send({user});
      }
    }
    catch(err){
      return res.status(400).send({error: 'System Failed'});
    }
  },

  async login(req, res){
    if(loginValidation(req.body))
      return res.status(400).send({error: 'Invalid data'});

    try{
      const user = await User.findOne({email: req.body.email})
      if(!user)
        return res.status(400).send("Email is not found");

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass)
        return res.status(400).send({error: 'Invalid password'})

      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send(token);
    }
    catch(err){
      return res.status(400).send({error: 'System failed'});
    }
  },

  async read(req, res){
    try{
      const {_id} = req.user;
      const user = await User.findById(
        _id
      ).populate('profile_photo');

      return res.send(user);
    }
    catch(err){
      return res.status(400).send({error: 'System failed'});
    }
  },

  async readById(req, res){
    try{
      const {id} = req.params;

      const user = await User.findById(
        id
      ).populate('profile_photo');

      if(user)
        return res.status(200).send(user);
    }
    catch(err){
      console.log(err);
    }
  },

  async readByName(req, res){
    try{
      const {_id} = req.user;
      const {full_name} = req.params;

      const user = await User.find({
        $and: [
          {_id: {$ne: _id }},
          {full_name: {$regex: `^${full_name}`, $options: 'i'}}
        ]
      })
      .select('full_name _id');

      return res.status(200).send(user);
    }
    catch(err){
      console.log(err);
    }
  },

  async update(req, res){
    if(updateValidation(req.body))
        return res.status(400).send({error: 'Invalid data'});

    try{
      const {_id} = req.user;
      const {description} = req.body;

      await User.findByIdAndUpdate(_id, {
        description
      })

      return res.status(201).send({success: 'Successfully updated'});
    }
    catch(err){

    }
  },

  async updateProfilePhoto(req, res){
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

        if(profile_photo != "5f8e17dbe42f0b70b54c82e1"){
          await Image.findByIdAndRemove(profile_photo);
        }

        await User.findByIdAndUpdate(_id, {profile_photo: new_photo._id});

        return res.status(201).send(new_photo);
      });
      session.endSession();
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  }
}

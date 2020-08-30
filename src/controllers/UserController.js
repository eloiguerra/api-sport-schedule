const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation
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
      const {full_name} = req.params;
      const user = await User.find({full_name});
      console.log(user);
    }
    catch(err){
      console.log(err);
    }
  }
}

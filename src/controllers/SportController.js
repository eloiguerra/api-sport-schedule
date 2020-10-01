const Sport = require('../models/SportModel');

module.exports = {
  async create(req, res){
    try{
      const {name} = req.body;

      const sport = await Sport.create({name})

      return res.status(201).send(sport);
    }
    catch(err){
      console.log(err);
    }
  },

  async read(req, res){
    try{
      const sports = await Sport.find();

      return res.status(200).send(sports);
    }
    catch(err){
      console.log(err);
    }
  }
}

const Publication = require('../models/PublicationModel');

module.exports = {
  async create(req, res){
    try{
      const {_id} = req.user;
      const {description, sport} = req.body;

      const publication = await Publication.create({
        user: _id,
        sport,
        description,
        image: null,
      });

      return res.status(201).send(publication);
    }
    catch(err){
      console.log(err);
    }
  },

  async read(req, res){
    try{
      const publications = await Publication.find().populate();

      return res.status(200).send(publications);
    }
    catch(err){
      console.log(err);
    }
  }
}

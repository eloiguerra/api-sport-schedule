const Game = require('../models/GameModel');

module.exports = {
  async create(req, res){
    try{
      const {
        name, date, hour,
        description, sport,
        lat, lng
      } = req.body;

      const game = await Game.create({
        owner: req.user._id,
        name,
        description,
        date,
        hour,
        sport,
        lat,
        lng
      });

      return res.status(201).send(game);
    }
    catch(err){
      return res.send(err);
    }
  },

  async read(req, res){
    try{
      const games = await Game.find()
      .populate('sport')
      .populate('owner', 'full_name');

      return res.status(200).send(games);
    }
    catch(err){
      return res.send(err);
    }
  }
}

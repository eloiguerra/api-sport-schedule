const moongose = require('../config/database');
const GameSchema = require('../schemas/GameSchema');

const Game = moongose.model('Game', GameSchema);

module.exports = Game;

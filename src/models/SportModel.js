const moongose = require('../config/database');
const SportSchema = require('../schemas/SportSchema');

const Sport = moongose.model('Sport', SportSchema);

module.exports = Sport;

const moongose = require('../config/database');
const PublicationSchema = require('../schemas/PublicationSchema');

const Publication = moongose.model('Publication', PublicationSchema);

module.exports = Publication;

const moongose = require('../config/database');
const ImageSchema = require('../schemas/ImageSchema');

const Image = moongose.model('Image', ImageSchema);

module.exports = Image;

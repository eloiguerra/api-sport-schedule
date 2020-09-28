const Image = require('../models/ImageModel');

module.exports = {
  async profileStore(req, res){
    try{
      const {originalname: name, size, filename: key} = req.file
      const image = await Image.create({
        name,
        size,
        key,
        url: `http://localhost:3333/files/${key}`
      });

      return res.status(201).send(image);
    }
    catch(err){
      return res.status(401).send({error: err});
    }
  }
}

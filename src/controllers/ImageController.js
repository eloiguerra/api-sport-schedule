const Image = require('../models/ImageModel');
module.exports = {
  async store(req, res){
    try{
      const {originalname: name, size, filename: key} = req.file;
      const image = await Image.create({
        name,
        size,
        key,
        url: `http://localhost:3333/files/${key}`
      });

      return res.status(201).send(image);
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  },

  async delete(req, res){
    try{
      const {id} = req.file;

      const image = await Image.findByIdAndDelete(id);

      return res.status(200).send(image);
    }
    catch(err){
      return res.status(400).send({error: err});
    }
  },
}

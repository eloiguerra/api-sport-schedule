const jwt = require(`jsonwebtoken`);

module.exports = function auth(req, res, next){
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if(token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if(!token) return res.status(401).send({error: 'Acess Denied'});

  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  }
  catch(err){
    res.status(400).send('Invalid Token');
  }
}


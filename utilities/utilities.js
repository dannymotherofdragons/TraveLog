var jwt = require('jsonwebtoken');

const generateToken = (user_info, callback) => {
    let secret = process.env.SECRET; 
    let token = jwt.sign({data: user_info}, secret, {expiresIn: '1h'});
    return callback(token);
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Token não providenciado!"
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Não autorizado!" });
      }
      next();
    });
  };

exports.generateToken = generateToken
exports.verifyToken = verifyToken
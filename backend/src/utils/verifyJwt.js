const jwt = require('jsonwebtoken');

function verifyJwt(token, secret, options) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = verifyJwt;

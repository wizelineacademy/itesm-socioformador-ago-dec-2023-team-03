const jwt = require('jsonwebtoken');

function createJwt(payload, secret, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = createJwt;

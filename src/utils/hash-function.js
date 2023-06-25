const crypto = require('crypto');

function createRandomHash(inputString) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .createHash('sha256')
    .update(inputString + salt)
    .digest('hex');

  return hash;
};

module.exports = createRandomHash;
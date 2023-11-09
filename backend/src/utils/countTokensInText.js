const tik = require('js-tiktoken');

function calculateTokensCount(content, model) {
  const enc = tik.encodingForModel(model);
  return enc.encode(content).length;
}

module.exports = calculateTokensCount;

const tik = require('js-tiktoken');

function calculateTokensCount(content, model) {
  if (typeof content !== 'string') {
    throw new Error('Content must be a string');
  }
  
  const enc = tik.encodingForModel(model);
  return enc.encode(content).length;
}

module.exports = calculateTokensCount;

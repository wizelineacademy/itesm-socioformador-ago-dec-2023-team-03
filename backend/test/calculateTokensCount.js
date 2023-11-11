const { expect } = require('chai');
const calculateTokensCount = require('../src/utils/calculateTokensCount.js');

describe('calculateTokensCount function', () => {

  it('should return the correct token count for a valid input', () => {
    const content = 'This is a test content.';
    const model = 'gpt-3.5-turbo';
    const result = calculateTokensCount(content, model);
    expect(result).to.be.a('number');
  });

  it('should throw an error if content is not a string', () => {
    const invalidContent = 123;
    const model = 'gpt-3.5-turbo';
    const calculateWithInvalidContent = () => calculateTokensCount(invalidContent, model);
    expect(calculateWithInvalidContent).to.throw(Error, 'Content must be a string');
  });

  it('should throw an error for an invalid model', () => {
    const content = 'This is a test content.';
    const invalidModel = 'invalid-model';
    const calculateWithInvalidModel = () => calculateTokensCount(content, invalidModel);
    expect(calculateWithInvalidModel).to.throw(Error, 'Unknown model');
  });
  
});

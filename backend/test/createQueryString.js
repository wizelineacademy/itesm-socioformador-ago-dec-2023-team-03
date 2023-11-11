const { expect } = require('chai');
const createQueryString = require('../src/utils/createQueryString.js');

describe('createQueryString function', () => {

  it('should create a query string with multiple parameters', () => {
    const params = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const result = createQueryString(params);
    expect(result).to.equal('?key1=value1&key2=value2&key3=value3');
  });

  it('should create a query string with a single parameter', () => {
    const params = { key: 'value' };
    const result = createQueryString(params);
    expect(result).to.equal('?key=value');
  });

  it('should create an empty query string for an empty parameters object', () => {
    const params = {};
    const result = createQueryString(params);
    expect(result).to.equal('');
  });
  
});

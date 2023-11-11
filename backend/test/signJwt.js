const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const signJwt = require('../src/utils/signJwt.js');

const mockSecret = 'mockSecret';
const mockOptions = { expiresIn: '1h', algorithm: 'HS256' };

describe('signJwt function', () => {

  it('should resolve with a valid JWT for a given payload', async () => {
    // Define a sample payload for testing
    const samplePayload = { userId: '123', username: 'testuser' };

    // Call the signJwt function and assert that it resolves with a valid JWT
    const result = await signJwt(samplePayload, mockSecret, mockOptions);
    expect(result).to.be.a('string');

    // Verify that the created token is a valid JWT
    const decoded = jwt.verify(result, mockSecret);
    delete decoded.iat;
    delete decoded.exp;
    expect(decoded).to.deep.equal(samplePayload);
  });
  
});

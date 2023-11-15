const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const verifyJwt = require('../src/utils/verifyJwt.js');

const mockSecret = 'mockSecret';
const mockOptions = { algorithm: 'HS256' };

describe('verifyJwt function', () => {

  it('should resolve with the decoded payload for a valid JWT', async () => {
    // Create a valid JWT for testing
    const payload = { userId: '123', username: 'testuser' };
    const validToken = jwt.sign(payload, mockSecret, mockOptions);

    // Call the verifyJwt function and assert the resolved decoded payload
    const decoded = await verifyJwt(validToken, mockSecret, mockOptions);
    delete decoded.iat;
    expect(decoded).to.deep.equal(payload);
  });

  it('should reject with an error for an invalid JWT', async () => {
    // Create an invalid JWT for testing (using an incorrect secret)
    const invalidToken = jwt.sign({ userId: '123' }, 'wrongSecret', mockOptions);

    // Call the verifyJwt function and assert that it rejects with an error
    try {
      await verifyJwt(invalidToken, mockSecret, mockOptions);
      expect.fail('Expected an error but none was thrown');
    } catch (error) {
      // Assert that the error is an instance of jwt.JsonWebTokenError
      expect(error).to.be.an.instanceOf(jwt.JsonWebTokenError);
      expect(error.message).to.equal('invalid signature');
    }
  });
});

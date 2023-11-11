const { expect } = require('chai');
const checkEnvs = require('../src/utils/checkEnvs.js');

describe('checkEnvs function', () => {
  it('should return true when all environment variables are defined', () => {
    const definedEnvs = { ENV_VAR_1: 'value1', ENV_VAR_2: 'value2' };
    process.env = { ...definedEnvs };
    const result = checkEnvs(Object.keys(definedEnvs));
    expect(result).to.be.true;
  });

  it('should throw an error when an environment variable is undefined', () => {
    const undefinedEnv = 'UNDEFINED_VAR';
    process.env = {};
    const checkWithUndefinedEnv = () => checkEnvs([undefinedEnv]);

    expect(checkWithUndefinedEnv).to.throw(Error, `Environment variable ${undefinedEnv} is undefined`);
  });
});

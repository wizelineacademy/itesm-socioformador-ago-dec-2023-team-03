const filterByCondition = require('./filterByConditon.js')

function checkEnvs(envs) {
  const undefinedEnvs = filterByCondition(envs, (env) => !process.env[env]);

  if (undefinedEnvs.length > 0) {
    let errorMessage = undefinedEnvs.length === 1
      ? `Environment variable ${undefinedEnvs[0]} is undefined`
      : `Following environment variables are undefined: ${undefinedEnvs}`;

    throw new Error(errorMessage);
  }
  
  return true;
}

module.exports = checkEnvs;

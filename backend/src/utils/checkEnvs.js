function checkEnvs(envs) {
  const undefinedEnvs = [];

  for (const env of envs) {
    if (!process.env[env]) {
      undefinedEnvs.push(env);
    }
  }

  if (undefinedEnvs.length > 0) {
    let errorMessage = undefinedEnvs.length === 1
      ? `Environment variable ${undefinedEnvs[0]} is undefined`
      : `Following environment variables are undefined: ${undefinedEnvs}`;

    throw new Error(errorMessage);
  }
  
  return true;
}

module.exports = checkEnvs;

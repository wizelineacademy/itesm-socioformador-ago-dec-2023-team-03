const { ClientError, ExtendedError } = require("../errors");

async function validateIdInModel(id, model) {
  const modelName = model.name;
  let foundItem;

  try {
    foundItem = await model.findByPk(id);
  } catch (err) {
    throw new ExtendedError(`An error ocurred while validating id ${id} in model "${modelName}"`, err);
  }

  if (!foundItem) {
    throw new ClientError(404, `id ${id} in model "${modelName}" doesn't exist`);
  }

  return foundItem;
}

module.exports = validateIdInModel;

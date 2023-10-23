const { ApiError } = require("../errors");

async function validateIdInModel(id, model) {
  const foundItem = await model.findByPk(id);
  if (!foundItem) {
    const modelName = model.name;
    throw new ApiError(404, `${modelName} with ID ${id} doesn't exist`);
  }
  return foundItem;
}

module.exports = validateIdInModel

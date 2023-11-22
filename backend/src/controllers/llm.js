// Models
const LLM = require('../models/LLM.js');

// Validators
const LlmValidator = require('../validators/llm.js');

// Errors
const { ApiError } = require('../errors');

// ---------------------------------------------------------------------------------------------------------------------
async function create(req, res, next) {
  try {
    const { name, model } = req.body;

    // Attempt to find an existing llm with the same name
    let llm = await LLM.findOne({ where: { name, model } });

    // If an existing llm is found, throw an ApiError indicating the llm already exists
    if (llm) {
      throw new ApiError(400, `LLM with name "${name}" and model "${model}" already exists`);
    }

    // If no existing llm is found, proceed to create a new llm
    llm = await LLM.create({ name, model });

    res.status(201).json({
      success: true,
      message: 'LLM created successfully',
      data: { llm: llm.toJSON() }
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function find(req, res, next) {
  try {
    const { id } = req.params;
    // Retrieve all llm's from the database (setting 'raw' to 'true' to get plain data)
    const llm = await LLM.findByPk(id);

    return res.status(200).json({
      success: true,
      data: { llm }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all llm's from the database (setting 'raw' to 'true' to get plain data)
    const llms = await LLM.findAll({ raw: true });

    return res.status(200).json({
      success: true,
      data: { llms }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function update(req, res, next) {
  try {
    // Extract the 'id' from the request parameters
    const id = req.params.id;

    // Find the role in the database by its 'id'
    const role = await Role.findByPk(id);

    // If the role doesn't exist, throw a 404 error
    if (!role) {
      throw new ApiError(404, 'Role not found');
    }

    const body = req.body;
    const name = body.name;

    const llmValidator = new LlmValidator();

    // Validate the name
    const nameValidation = llmValidator.validateName(name);

    // Check if the validation has errors and if so, throw an error
    if (nameValidation.error) {
      throw new ApiError(400, nameValidation.error.message);
    }
    
    // Update the 'name' of the role with the validated 'name'
    role.name = nameValidation.value;

    // Save the updated role
    await role.save();

    return res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: { role: role.dataValues }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function remove(req, res, next) {
  try {
    // Extract the 'id' parameter from the request.
    const id = req.params.id;

    // Use Sequelize's 'destroy' method to delete the role based on the 'id'.
    const destroyedRoles = await Role.destroy({ where: { id } });

    // Check if any roles were deleted (destroyedRoles === 0 means no roles were found or deleted).
    if (destroyedRoles === 0) {
      throw new ApiError(404, 'Role not found');
    }

    return res.status(200).json({
      success: true,
      message: 'Role removed successfully'
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  create,
  getAll,
  update,
  remove,
  find
};

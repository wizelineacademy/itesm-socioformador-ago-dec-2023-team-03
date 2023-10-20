// Models
const Role = require('../models/Role.js');

// Validators
const RoleValidator = require('../validators/role.js');

// Errors
const { ApiError } = require('../errors');

// ---------------------------------------------------------------------------------------------------------------------
async function create(req, res, next) {
  try {
    const body = req.body;
    const name = body.name;

    const roleValidator = new RoleValidator();

    // Validate the name
    const nameValidation = roleValidator.validateName(name);

    // Check if the name validation resulted in an error
    if (nameValidation.error) {
      throw new ApiError(400, nameValidation.error.message);
    }

    const validatedName = nameValidation.value;

    // Attempt to find an existing role with the same name
    let role = await Role.findOne({ where: { name: validatedName } });

    // If an existing role is found, throw an ApiError indicating the role already exists
    if (role) {
      throw new ApiError(400, 'Role already exists');
    }

    // If no existing role is found, proceed to create a new role
    role = await Role.create({ name: validatedName });
    const roleValues = role.dataValues;

    return res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: { role: roleValues }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all roles from the database (setting 'raw' to 'true' to get plain data)
    const roles = await Role.findAll({ raw: true });

    return res.status(200).json({
      success: true,
      data: { roles }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function update(req, res, next) {
  try {
    const body = req.body;
    const name = body.name;

    const roleValidator = new RoleValidator();

    // Validate the name
    const nameValidation = roleValidator.validateName(name);

    // Check if the validation has errors and if so, throw an error
    if (nameValidation.error) {
      throw new ApiError(400, nameValidation.error.message);
    }

    // Extract the 'id' from the request parameters
    const id = req.params.id;

    // Find the role in the database by its 'id'
    const role = await Role.findByPk(id);

    // If the role doesn't exist, throw a 404 error
    if (!role) {
      throw new ApiError(404, 'Role not found');
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
  remove
}

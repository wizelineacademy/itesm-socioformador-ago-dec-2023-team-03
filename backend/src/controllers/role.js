// Models
const { Role } = require('../models');

// Errors
const { ApiError } = require('../errors');

// Utils
const validateIdInModel = require('../utils/validateIdInModel.js')

// ---------------------------------------------------------------------------------------------------------------------
async function create(req, res, next) {
  try {
    const name = req.body.name;

    // Attempt to find an existing role with the same name
    let foundRole = await Role.findOne({ where: { name } });
    if (foundRole) {
      throw new ApiError(400, `Role with name "${name}" already exists`);
    }

    const createdRole = await Role.create({ name });

    res.status(201).json({
      success: true,
      message: `Role "${createdRole.name}" created successfully`,
      data: { role: createdRole.dataValues }
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all roles from the database (setting 'raw' to 'true' to get plain data)
    const roles = await Role.findAll({ raw: true });

    res.status(200).json({
      success: true,
      data: { roles }
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function update(req, res, next) {
  try {
    const roleId = req.params.id;
    const name = req.body.name;

    const role = await validateIdInModel(roleId, Role);

    if (role.name === name) {
      throw new ApiError(400, `Role with name "${name}" already exists`);
    }

    role.name = name;
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: { role: role.dataValues }
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function remove(req, res, next) {
  try {
    const roleId = req.params.id;

    const role = await validateIdInModel(roleId, Role);
    await role.destroy();

    res.status(200).json({
      success: true,
      message: `Role "${role.name}" deleted successfully`
    });
  } catch(err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  create,
  getAll,
  update,
  remove
}

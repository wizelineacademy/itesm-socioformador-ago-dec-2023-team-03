// Models
const Member = require('../models/Member.js');
const Role = require('../models/Role.js');

// Validators
const MemberValidator = require('../validators/member.js');

// Errors
const { ApiError } = require('../errors');

// Utils
const signJwt = require('../utils/signJwt.js');

// ---------------------------------------------------------------------------------------------------------------------
async function login(req, res, next) {
  try {
    const body = req.body;
    const email = body.email;

    const memberValidator = new MemberValidator();

    // Validate the email
    const emailValidation = memberValidator.validateEmail(email);

    // Check if email validation has an error
    if (emailValidation.error) {
      throw new ApiError(400, emailValidation.error.message);
    }

    // Use Sequelize to find a member based on the provided email
    let member = await Member.findOne({ where: { email } });

    // If no member is found, throw a 400 Bad Request error indicating that the email is not registered
    if (!member) {
      throw new ApiError(400, 'Member email is not registered');
    }

    const memberValues = member.dataValues;

    // Extract member's associated role
    const role = await Role.findByPk(memberValues.roleId);
    
    // Create a payload for the JSON Web Token (JWT) that includes member details and their role name
    const jwtPayload = { ...memberValues, roleName: role.dataValues.name };

    // Generate a JWT using the payload, a secret, and an expiration time of 30 seconds
    const token = await signJwt(jwtPayload, process.env.JWT_LOGIN_SECRET, {
      expiresIn: 30
    });

    // Set the generated token as a signed cookie in the response
    res.cookie('login-token', token, {
      maxAge: 60000, // Expiration time for the cookie in milliseconds (60 seconds)
      secure: false,  // Cookie can be sent over non-HTTPS connections (for development)
      httpOnly: true,  // Cookie is not accessible via JavaScript
      signed: true // If the cookie value is modified, it becomes invalid
    });

    return res.status(200).json({
      success: true,
      message: 'Member logged in successfully',
      data: { member: memberValues }
    });
  } catch(err) {
    return next(err)
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function register(req, res, next) {
  try {
    const body = req.body;

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const roleId = body.roleId;

    const memberValidator = new MemberValidator();

    // Validate the first name
    const firstNameValidation = memberValidator.validateFirstName(firstName);
    // Check if there is a validation error for the first name
    if (firstNameValidation.error)
      throw new ApiError(400, firstNameValidation.error.message);

    // Validate the last name
    const lastNameValidation = memberValidator.validateLastName(lastName);
    // Check if there is a validation error for the last name
    if (lastNameValidation.error)
      throw new ApiError(400, lastNameValidation.error.message);

    // Validate the email
    const emailValidation = memberValidator.validateEmail(email);
    // Check if there is a validation error for the email
    if (emailValidation.error)
      throw new ApiError(400, emailValidation.error.message);

    const validatedEmail = emailValidation.value;

    // Check if a member with the provided email already exists
    let member = await Member.findOne({ where: { email: validatedEmail } });

    // If a member is found, throw a 400 Bad Request error indicating that the member already exists
    if (member) {
      throw new ApiError(400, `Member with email ${validatedEmail} already exists`);
    }
    
    // Validate the role id
    const roleIdValidation = memberValidator.validateRoleId(roleId);
    // Check if there is a validation error for the role id
    if (roleIdValidation.error)
      throw new ApiError(400, roleIdValidation.error.message);

    // Create a new member in the database with the validated data
    member = await Member.create({
      firstName: firstNameValidation.value,
      lastName: lastNameValidation.value,
      email: emailValidation.value,
      roleId: roleIdValidation.value
    });

    return res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: { member }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getAll(req, res, next) {
  try {
    // Retrieve all members from the database (setting 'raw' to 'true' to get plain data)
    const members = await Member.findAll({ raw: true });

    return res.status(200).json({
      success: true,
      data: { members }
    });
  } catch(err) {
    return next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  login,
  register,
  getAll
};

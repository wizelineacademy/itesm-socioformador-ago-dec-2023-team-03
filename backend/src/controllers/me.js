// Models
const {
  Member,
  Team,
  Role
} = require("../models");

// ---------------------------------------------------------------------------------------------------------------------
function getMe(req, res, next) {
  const me = req.me;
  res.status(200).json({
    success: true,
    data: { me }
  });
}
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
async function getMyTeams(req, res, next) {
  try {
    const me = req.me;
  
    const foundTeams = await Member.findByPk(me.id, {
      attributes: [],
      include: [
        {
          model: Team,
          attributes: ['id', 'name', 'createdAt'],
          through: {
            attributes: []
          }
        }
      ]
    });
  
    if (!foundTeams) {
      const errorMessage = `Member with id "${me.id}" doesn't exists`;
      throw new ApiError(404, errorMessage);
    }
  
    const teams = foundTeams.toJSON();
  
    res.status(200).json({
      success: true,
      data: { ...teams }
    });
  } catch (err) {
    next(err);
  }
}
// ---------------------------------------------------------------------------------------------------------------------

module.exports = {
  getMe,
  getMyTeams
};

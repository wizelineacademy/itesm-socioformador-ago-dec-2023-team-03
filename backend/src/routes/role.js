const express = require('express');

const router = express.Router();

// Middlewares
const validateLoginToken = require('../middlewares/validateLoginToken.js');
const isAdmin = require('../middlewares/isAdmin.js');

// Controllers
const {
  create,
  getAll,
  update,
  remove
} = require('../controllers/role.js');

// Route middlewares
router.use(validateLoginToken);
router.use(isAdmin);

// Routes
router.route('/')
  .post(create)
  .get(getAll);

router.route('/:id')
  .patch(update)
  .delete(remove)

module.exports = router;

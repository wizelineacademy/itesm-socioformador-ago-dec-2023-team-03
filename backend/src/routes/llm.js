const express = require('express');

const router = express.Router();

const {
} = require('../controllers/llm.js');

router.route('/llm')
  .post();

module.exports = router;

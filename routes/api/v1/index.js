const express = require('express');

const router = express.Router();
const postsAPI = require('../../../controllers/api/v1');

router.get('/index', postsAPI.index);

module.exports = router;
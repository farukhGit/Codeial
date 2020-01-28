const express = require('express');

const router = express.Router();
const postsAPI = require('../../../controllers/api/v1/posts_api');

router.use('/posts', require('./posts'));

module.exports = router;
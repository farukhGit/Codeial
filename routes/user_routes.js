const express = require('express')
const router = express.Router();

router.get('/profile', require('../controllers/users_controller').profile);

module.exports = router;
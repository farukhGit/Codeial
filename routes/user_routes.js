const express = require('express')
const router = express.Router();

const userController = require('../controllers/users_controller');


router.get('/profile', require('../controllers/users_controller').profile);

module.exports = router;
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');


router.get('/', homeController.homeActionOne);
router.use('/users', require('./user_routes.js'));


module.exports = router;
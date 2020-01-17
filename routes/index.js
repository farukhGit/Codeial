const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.homeActionOne);
router.use('/users', require('./user_routes.js'));
router.use('/posts', require('./posts_routes'));


module.exports = router;
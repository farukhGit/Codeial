const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.use('/users', require('./user_routes.js'));
router.use('/posts', require('./posts_routes'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));


module.exports = router;
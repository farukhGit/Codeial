const express = require('express')
const router = express.Router();

const userController = require('../controllers/users_controller');
const passport = require('passport');


router.get('/about', passport.checkAuthentication, userController.about);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);

router.post('/createSession', passport.authenticate('local', {
    failureRedirect : '/users/sign-in'
}), userController.createSession);

router.get('/sign-out', userController.destroySession);

// router.get('/destroySession', userController.destroySession);

module.exports = router;
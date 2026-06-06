const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const UserController = require('../controller/Usercontroller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forget-password',  UserController.forgetPassword);
router.post('/verify-otp', UserController.verifyOtp);
router.post('/reset-password',  UserController.resetPassword);
router.get('/profile', auth, UserController.getProfile);

module.exports = router;



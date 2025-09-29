const express = require('express');
const {signUpUser, logInUser, logOutUser} = require('../controller/userController');
const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

router.post('/logoutUser', logOutUser);



module.exports = router ;
const express = require('express');
const router = express.Router();

const { 
    newRegisterUser,
    authUser,
    checkingForUser,
    profile
} = require("../controllers/user.controllers");
const verifyToken = require("../middleware/auth");

router.route('/signup').post(newRegisterUser);
router.route('/login').post(authUser);
router.route('/privateData').get(verifyToken,checkingForUser);
router.route("/profile").get(verifyToken, profile);

module.exports = router;
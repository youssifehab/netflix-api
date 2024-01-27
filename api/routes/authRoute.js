const router = require("express").Router();

const { userRegister, userLogin } = require("../services/authService");

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;

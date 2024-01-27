const router = require("express").Router();

const { verify } = require("../verifyToken");

const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
} = require("../services/userService");

router.route("/:id").put(verify, updateUser).delete(verify, deleteUser);
router.route("/find/:id").get(getUser);
router.route("/").get(verify, getUsers);
router.route("/stats").get(getUserStats);

module.exports = router;

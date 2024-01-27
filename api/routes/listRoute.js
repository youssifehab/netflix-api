const router = require("express").Router();

const { verify } = require("../verifyToken");

const { createList, getList } = require("../services/listService");

router.route("/").post(verify, createList);
router.route("/").get(getList);

module.exports = router;

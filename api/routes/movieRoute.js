const router = require("express").Router();

const { verify } = require("../verifyToken");

const {
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getRandomMovie,
  getAllMovies,
} = require("../services/movieService");

router.route("/:id").put(verify, updateMovie).delete(verify, deleteMovie);
router.route("/find/:id").get(getMovie);
router.route("/").post(verify, createMovie).get(verify, getAllMovies);
router.route("/random").get(getRandomMovie);

module.exports = router;

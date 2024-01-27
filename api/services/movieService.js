const bycrypt = require("bcrypt");

const movieModel = require("../models/movie");

//CREATE
exports.createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await movieModel.create(req.body);
      res.status(201).json({ data: movie });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can not create movie!`);
  }
};

//UPDATE
exports.updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await movieModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(201).json({ data: movie });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can not update movie!`);
  }
};

//DELETE
exports.deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await movieModel.findByIdAndDelete(req.params.id);
      res.status(200).send("Movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can not delete this movie!`);
  }
};

//GET
exports.getMovie = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    // const { passowrd, ...info } = user._doc;
    res.status(200).json({ data: movie });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET RANDOM
exports.getRandomMovie = async (req, res) => {
  const { type } = req.query;
  let movie;
  try {
    if (type === "series") {
      movie = await movieModel.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await movieModel.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json({ data: movie });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL MOVIES
exports.getAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await movieModel.find();
      res.status(200).json({ data: movies.reverse() });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can not allowed!`);
  }
};

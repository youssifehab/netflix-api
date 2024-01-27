const bycrypt = require("bcrypt");

const listModel = require("../models/list");

//CREATE
exports.createList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const list = await listModel.create(req.body);
      res.status(201).json({ data: list });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can not create list!`);
  }
};

exports.getList = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await listModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await listModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await listModel.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json({ length: list.length, data: list });
  } catch (err) {
    res.status(500).json(err);
  }
};

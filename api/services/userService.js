const bycrypt = require("bcrypt");

const userModel = require("../models/user");

//UPDATE
exports.updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = await bycrypt.hash(req.body.password, 10);
    }
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can only update your account.`);
  }
};

//DELETE
exports.deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send(`you can only delete your account.`);
  }
};

//GET
exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { passowrd, ...info } = user._doc;
    res.status(200).json({ data: info });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL
exports.getUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await userModel.find().sort({ _id: -1 }).limit(10)
        : await userModel.find();
      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send("You are not allowed to see users!");
  }
};

exports.getUserStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ data });
  } catch (err) {
    res.send(500).json(err);
  }
};

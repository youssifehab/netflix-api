var bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");

dotenv.config({ path: "../config.env" });

//REGISTER
exports.userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUsername = await userModel.findOne({ username });

    if (findUsername) {
      return res.status(400).send("wrong username, email or password");
    }

    const findEmail = await userModel.findOne({ email });

    if (findEmail) {
      return res.status(400).send("wrong username, email or password");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//LOGIN
exports.userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const pass = req.body.password;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("wrong email or password");
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      //this line to hide password from result
      return res.status(400).send("wrong email or password");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

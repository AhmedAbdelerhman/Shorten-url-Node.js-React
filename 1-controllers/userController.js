const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
//const Movie = require("../models/movieModel");
const bcrypt = require("bcrypt");

//@description      register a new  user
//@route           post /api/user/signup
//@access          public
exports.registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "some data missed" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      pic,
    });

    if (user) {
      res.status(201).json({
        message: "user created successfully",
        user: user,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "failed to create user" });
    }
  } catch (error) {
    if (error.code === 11000)
      res.status(400).json({ message: "the email already in the database" });
    else res.status(400).json({ message: "failed to create user" });
  }
};

//@description     login (login) a user
//@route           post /api/user/login
//@access          public
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "password is not correct" });
    } else {
      delete user["password"];

      const token = generateToken(user._id);
      res.status(200).json({
        message: "login successfully",
        token: token,
        userId: user._id.toString(),
        loggedUser: user,
      });
    }
  } else {
    return res.status(401).json({ message: "email not found" });
  }
};


//@description     get all registered user
//@route           get /api/user/
//@access          protected by token
exports.getAllUsers = async (req, res) => {
  const users = await User.find({})
    .sort({ name: 1 })
    .find({ id: { $ne: req.user._id } })
    .select("-password");

  res.send({ message: "all user sorted by name", users });
};


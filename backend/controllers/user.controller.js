const db = require("../models");
const User = db.User;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // SELECT * FROM Users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // INSERT
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
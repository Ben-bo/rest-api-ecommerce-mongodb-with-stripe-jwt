const UsersModels = require("../models/Users.models");
const CryptoJS = require("crypto-js");
const auth = {
  register: async (req, res) => {
    try {
      const newUser = new UsersModels({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString(),
      });
      const save = await newUser.save();
      res.status(201).json(save);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
    } catch (error) {}
  },
};
module.exports = auth;

const UsersModels = require("../models/Users.models");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
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
      let status = 200;
      let message = "SUCCESS";
      let tokenUser = null;
      let data = {};
      const findUser = await UsersModels.findOne({
        username: req.body.username,
      });
      if (findUser) {
        const decryptPass = CryptoJS.AES.decrypt(
          findUser.password,
          process.env.SECRET_KEY
        );
        const pass = decryptPass.toString(CryptoJS.enc.Utf8);
        if (pass === req.body.password) {
          const { password, ...other } = findUser._doc;
          const token = jwt.sign(other, process.env.SECRET_KEY, {
            expiresIn: "3d",
          });
          tokenUser = token;
          data = other;
        } else {
          message = "Wrong password";
          status = 500;
        }
      } else {
        message = "Wrong username";
        status = 500;
      }

      res.status(status).json({
        Message: message,
        ...data,
        Token: tokenUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
module.exports = auth;

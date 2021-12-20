const { register } = require("../controllers/auth");

const route = require("express").Router();
route.post("/register", register);

module.exports = route;

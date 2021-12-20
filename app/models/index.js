const mongoose = require("mongoose");

const url = process.env.CLUSTER_URL;
mongoose.Promise = global.Promise;
const db = {
  mongoose: mongoose,
  url: url,
};
module.exports = db;

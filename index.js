const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db.config");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { auth } = require("./app/routes");
app.use("/api", auth);

app.listen(port, () => {
  console.log(`server run on port :${port}`);
});

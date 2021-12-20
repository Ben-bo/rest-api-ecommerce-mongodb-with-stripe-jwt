module.exports = (app) => {
  const route = require("express").Router();
  route.get("/");
  app.use("/api/shop", route);
};

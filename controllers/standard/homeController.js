const express = require("express");
const router = express.Router();

const homeController = router.get("/", (_, res) => {
  try {
    res.send("ExpressAPI");
  } catch (error) {
    res.json(error);
  }
});

module.exports = homeController;

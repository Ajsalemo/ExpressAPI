const express = require("express");
const router = express.Router();

// Catches all non matching routes and redirects it back to the root
const catchAllController = router.get("*", (_, res) => {
  try {
    res.redirect("/");
  } catch (error) {
    res.json(error);
  }
});

module.exports = catchAllController;

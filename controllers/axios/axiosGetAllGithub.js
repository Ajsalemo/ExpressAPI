const express = require("express");
const router = express.Router();

const axiosGetAllGithub = router.get("/", (_, res) => {
  try {
    res.send("Placeholder");
  } catch (error) {
    res.json(error);
  }
});

module.exports = axiosGetAllGithub;

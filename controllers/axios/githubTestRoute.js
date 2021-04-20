const express = require("express");
const router = express.Router();
const axiosInstance = require("../../config/keepAlive");

const githubTestRoute = router.get("/", async (_, res, next) => {
  try {
    const { data } = await axiosInstance.get(
      `${process.env.GITHUB_API_URL}/zen`
    );
    res.json({ message: data });
  } catch (err) {
    next(err);
  }
});

module.exports = githubTestRoute;

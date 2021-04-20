const express = require("express");
const router = express.Router();
const models = require("../../models");

const { Todo } = models;

const getTodoController = router.get("/", async (_, res, next) => {
  try {
    const getTodo = await Todo.findAll();
    return res.json(getTodo);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = getTodoController;

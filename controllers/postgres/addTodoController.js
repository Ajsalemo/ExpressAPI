const express = require("express");
const router = express.Router();
const models = require("../../models");
const validator = require("../../helpers/validator");

const { Todo } = models;

const addTodoController = router.post("/", async (req, res, next) => {
  try {
    // Validator is a function that does field level validation
    if (validator(req)) {
      return res.status(500).json({ error: "Invalid parameter" });
    }
    const createTodo = await Todo.create({
      name: req.body.name,
      completed: req.body.completed,
    });
    return res.status(201).json(createTodo);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = addTodoController;

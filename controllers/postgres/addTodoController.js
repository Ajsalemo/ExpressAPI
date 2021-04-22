const express = require("express");
const router = express.Router();
const models = require("../../models");

const { Todo } = models;

const addTodoController = router.post("/", async (req, res, next) => {
  console.log(typeof req.body.completed === "boolean");
  console.log(req.body.completed)
  try {
    if (
      !req.body ||
      !req.body.name ||
      req.body.name === "" ||
      !req.body.completed 
      // Check if the incoming parameter is of type boolean
      // typeof req.body.completed === "boolean"
    ) {
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

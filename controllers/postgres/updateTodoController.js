const express = require("express");
const router = express.Router();
const models = require("../../models");
const validator = require("../../helpers/validator");

const { Todo } = models;

const updateTodoController = router.put("/", async (req, res, next) => {
  const { id, name, completed } = req.body;
  try {
    // Validator is a function that does field level validation
    if (validator(req) || !id || id === "") {
      return res.status(500).json({ error: "Invalid parameter" });
    }

    // Find the object by ID
    const getTodoById = await Todo.findOne({
      where: {
        id: parseInt(id),
      },
    });
    // Check if the ID that will be passed into the update method exists first
    if (!getTodoById || !getTodoById.id) {
      return res.status(404).send({ message: `Todo not found with id ${id}` });
    }

    // Update the Todo with the provided values in req.body
    const updateTodoById = await Todo.update(
      {
        name: name,
        completed: completed,
      },
      {
        where: {
          id: parseInt(getTodoById.id),
        },
      }
    );
    // Send back the 200 if successfully
    // TODO - need to add returned rows in the response
    return res.status(200).json(updateTodoById);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = updateTodoController;

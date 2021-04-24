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
        // Postgres dialect specific options
        // https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
        returning: true,
        plain: true,
      }
    );
    // The result returns an array with 2 elements for Postgres
    // The first is the number of affected rows, the second is the actual row(s)
    // Deconstruct the array to pick just the affected row and return that back in the response
    const [_, updatedObj] = await updateTodoById;
    // Send back a 200 if successful along with the affected row 
    return res.status(200).json(updatedObj);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = updateTodoController;

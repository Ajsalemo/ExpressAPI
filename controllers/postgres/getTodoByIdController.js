const express = require("express");
const router = express.Router();
const models = require("../../models");

const { Todo } = models;

const getTodoByIdController = router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const getTodoById = await Todo.findOne({
      where: {
        id: parseInt(id),
      },
    });
    // Throw a HTTP 404 if the todo isn't found
    if (!getTodoById) {
      return res.status(404).send({ message: `Todo not found with id ${id}` });
    }
    return res.json(getTodoById);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = getTodoByIdController;

const express = require("express");
const router = express.Router();
const models = require("../../models");

const { Todo } = models;

const deleteTodoController = router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteTodo = await Todo.destroy({
      where: {
        id: parseInt(id),
      },
    });
    // Throw a HTTP 404 if the todo isn't found
    if (!deleteTodo) {
      return res.status(404).send({ message: `Todo not found with id ${id}` });
    }
    return res.status(200).json({ message: `Deleted todo with id ${id}` });
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = deleteTodoController;

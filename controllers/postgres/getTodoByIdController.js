const express = require("express");
const router = express.Router();
const models = require("../../models");

const { Todo } = models;

const getTodoByIdController = router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const getTodoById = await Todo.findOne({
      where: {
        id: id,
      },
    });
    return res.json(getTodoById);
  } catch (error) {
    console.log("An error occurred during query execution: ", error);
    next(error);
  }
});

module.exports = getTodoByIdController;

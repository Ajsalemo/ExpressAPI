// sequelize-cli can be used to quickly scaffold opinionated sequelize configurations
// https://github.com/sequelize/cli
const models = require("../models");

const { Todo } = models;

const seedDatabaseAsync = async () => {
  try {
    const createTodoSeed = await Todo.create({
      name: "Mow the grass",
      completed: true,
    });

    return createTodoSeed;
  } catch (error) {
    console.log("An error occurred during database seeding: ", error);
  }
};

module.exports = seedDatabaseAsync;

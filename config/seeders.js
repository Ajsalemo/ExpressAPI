const models = require("../models");

const d = Date().toString();
const { Todo } = models;

const seedDatabaseAsync = async () => {
  try {
    await Todo.create({
      name: "Test",
      completed: true,
      dateTime: d,
    });
  } catch (error) {
    console.log("An error occurred during database seeding: ", error);
  }
};

module.exports = seedDatabaseAsync;

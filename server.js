// Load dotenv
require("dotenv").config();
const express = require("express");
const os = require("os");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

// Sequelize
const { sequelize } = require("./models/index");
// Seeding function
const seedDatabaseAsync = require("./config/seeders");
// Seeding boolean
const eraseDatabaseOnSync = true;

// Controllers
const homeController = require("./controllers/standard/homeController");
const catchAllController = require("./controllers/standard/catchAllController");
const githubTestRoute = require("./controllers/axios/githubTestRoute");
const getTodoController = require("./controllers/postgres/getTodoController");
const getTodoByIdController = require("./controllers/postgres/getTodoByIdController");
const deleteTodoController = require("./controllers/postgres/deleteTodoController");
const addTodoController = require("./controllers/postgres/addTodoController");

// Other middleware
// This replaced using bodyParser which was added in express v4.16.0 and higher
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Logging
app.use(morgan("dev"));

// Controllers to use with routing
// Standard controllers
app.use(homeController);
// Github API controllers
app.use("/api/github/test", githubTestRoute);
// Postgres database controllers
app.use("/api/todo/all", getTodoController);
app.use("/api/todo/find/", getTodoByIdController);
app.use("/api/todo/delete/", deleteTodoController);
app.use("/api/todo/add", addTodoController);
// Catches all non matching routes and redirects it back to the root - must be placed last in the chain of middleware
app.use(catchAllController);

// Sync with Sequelize/Postgres, then start Express
sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      seedDatabaseAsync();
    }
    try {
      console.log("Successfully connected to Postgres");
      app.listen(port, () => {
        console.log(`INFO: Server is listening on port ${port}`);
        console.log(
          `INFO: There is ${
            os.cpus().length
          } cores available to spawn node processes on`
        );
      });
    } catch (error) {
      console.log(
        "ERROR: An error has occurred while connecting to Postgres: ",
        error
      );
    }
  })
  .catch((err) => {
    console.log(
      "ERROR: An error has occurred while connecting to Postgres: ",
      err
    );
  });

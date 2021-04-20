// Load dotenv
require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

// Controllers
const homeController = require("./controllers/standard/homeController");
const catchAllController = require("./controllers/standard/catchAllController");
const githubTestRoute = require("./controllers/axios/githubTestRoute");

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
// Catches all non matching routes and redirects it back to the root - must be placed last in the chain of middleware
app.use(catchAllController);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
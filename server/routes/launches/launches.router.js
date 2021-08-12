const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLunch,
  httpDeleteLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

module.exports = launchesRouter;

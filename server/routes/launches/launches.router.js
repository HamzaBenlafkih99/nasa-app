const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLunch,
  httpAbortedLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLunch);
launchesRouter.delete("/:id", httpAbortedLaunch);

module.exports = launchesRouter;

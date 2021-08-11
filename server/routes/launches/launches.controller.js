const { getAllLaunches, addNewLunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches);
}

function httpAddNewLunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json(launch);
  }
  launch.lunchDate = new Date(launch.lunchDate);
  addNewLunch(launch);

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLunch,
};

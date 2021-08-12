const {
  getAllLaunches,
  addNewLunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json({
    status: "success",
    launches: getAllLaunches(),
  });
}

function httpAddNewLunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json(launch);
  }
  launch.lunchDate = new Date(launch.lunchDate);
  addNewLunch(launch);

  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  //if launches doesn't exist
  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = abortLaunchById(launchId);

  //if launch does exist
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLunch,
  httpDeleteLaunch,
};

const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json({
    status: "success",
    launches: await getAllLaunches(),
  });
}

async function httpAddNewLunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "messing launches properties",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date ",
    });
  }
  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortedLaunch(req, res) {
  const launchId = Number(req.params.id);
  //if launches doesn't exist
  const existLaunch = await existLaunchWithId(launchId);
  if (!existLaunch) {
    return res.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "launch not aborted",
    });
  }
  //if launch does exist
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLunch,
  httpAbortedLaunch,
};

const launches = new Map();

const luanch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  lunchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["Nasa", "ZTM"],
  upcoming: true,
  success: true,
};

launches.set(luanch.flightNumber, luanch);

module.exports = {
  launches,
};

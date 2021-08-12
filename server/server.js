const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;

const MONGO_URI = "mongodb://localhost:27017/planets";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongo is ready ...");
});

mongoose.connection.once("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
startServer();

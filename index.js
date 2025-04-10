const express = require("express");
const cors = require("cors");
const { createUser } = require("./controllers/userControllers");
const { searchPhotos, savePhoto } = require("./controllers/photoControllers");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", createUser);
app.post("/api/photos", savePhoto);
app.get("/search/photos", searchPhotos);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Unable to connect to database", error));

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});

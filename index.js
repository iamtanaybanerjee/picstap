const express = require("express");
const cors = require("cors");
const {
  createUser,
  getSearchHistory,
} = require("./controllers/userControllers");
const {
  searchPhotos,
  savePhoto,
  addTagsToPhoto,
  searchPhotoByTag,
} = require("./controllers/photoControllers");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", createUser);
app.post("/api/photos", savePhoto);
app.post("/api/photos/:photoId/tags", addTagsToPhoto);
app.get("/api/photos/tag/search", searchPhotoByTag);
app.get("/api/search-history", getSearchHistory);
app.get("/search/photos", searchPhotos);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Unable to connect to database", error));

// app.listen(3000, () => {
//   console.log("server is listening to port 3000");
// });

// If this is a Vercel deployment, we need to export the app to be handled as a serverless function
module.exports = app;

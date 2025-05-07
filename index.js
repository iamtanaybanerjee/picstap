const express = require("express");
const cors = require("cors");
require("pg");
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

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Picstap API</title>
      </head>
      <body>
        <h1>Welcome to the Picstap Backend</h1>
        <p>This is the backend server. Please use the API routes to interact with the service.</p>
      </body>
    </html>
  `);
});
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

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});

module.exports = app;

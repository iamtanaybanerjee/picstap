const { axiosInstance } = require("../lib/axios.lib");
const { validateSearchPhotosQueryParam } = require("../validations/index");
require("dotenv").config();

const searchPhotos = async (req, res) => {
  if (!process.env.UNSPLASH_ACCESS_KEY)
    throw new Error("Please configure the env file");

  const query = req.query.query;
  const error = validateSearchPhotosQueryParam(query);

  if (error) return res.status(400).json({ error });

  try {
    const response = await axiosInstance.get(`/search/photos?query=${query}`);

    if (response.data.results.length === 0)
      return res
        .status(404)
        .json({ message: "No images found for the given query." });

    const photos = response.data.results.map((item) => {
      return {
        imageUrl: item.urls.raw,
        description: item.description,
        altDescription: item.alt_description,
      };
    });

    return res.status(200).json({ photos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchPhotos };

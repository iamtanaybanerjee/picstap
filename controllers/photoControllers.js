const { axiosInstance } = require("../lib/axios.lib");

const searchPhotos = async (req, res) => {
  const query = req.query.query;
  try {
    const response = await axiosInstance.get(`/search/photos?query=${query}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchPhotos };

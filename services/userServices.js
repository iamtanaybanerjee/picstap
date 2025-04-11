const { searchHistory: searchHistoryModel } = require("../models");

const trackSearchHistory = async (userId) => {
  const searchHistories = await searchHistoryModel.findAll({
    where: { userId },
  });
  return searchHistories;
};

module.exports = { trackSearchHistory };

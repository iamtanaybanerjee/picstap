const {
  tag: tagModel,
  photo: photoModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const { Op } = require("@sequelize/core");

const updatePhoto = async (photoId, updateData) => {
  const photoObj = await photoModel.findOne({ where: { id: photoId } });

  if (!photoObj) return {};

  photoObj.set(updateData);
  const updatedPhotoObj = await photoObj.save();
  return updatedPhotoObj;
};

const createTag = async (tagList, photoId) => {
  for (let i = 0; i < tagList.length; i++) {
    await tagModel.create({
      name: tagList[i],
      photoId,
    });
  }
};

const getPhotosByTag = async (tag, order) => {
  const tagList = await tagModel.findAll({
    where: { name: tag },
    attributes: ["photoId"],
  });

  const photoIds = [];

  for (let i = 0; i < tagList.length; i++) {
    photoIds.push(tagList[i].photoId);
  }

  console.log("photoIds", photoIds);

  //get photos for each phototId and sort them by dateSaved
  const photoRecords = await photoModel.findAll({
    where: {
      id: { [Op.in]: photoIds },
    },
    order: [["dateSaved", order === undefined ? "ASC" : order]],
  });

  return photoRecords;
};

const createSearchHistory = async (userId, tag) => {
  await searchHistoryModel.create({
    query: tag,
    userId,
  });
};

module.exports = {
  updatePhoto,
  createTag,
  getPhotosByTag,
  createSearchHistory,
};

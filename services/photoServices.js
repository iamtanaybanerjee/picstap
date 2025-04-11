const { tag: tagModel, photo: photoModel } = require("../models");
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

const getPhotosByTag = async (tag) => {
  const tagList = await tagModel.findAll({
    where: { name: tag },
    attributes: ["photoId"],
  });

  const photoIds = [];

  for (let i = 0; i < tagList.length; i++) {
    photoIds.push(tagList[i].photoId);
  }

  console.log("photoIds", photoIds);

  //get photos for each phototId
  const photoRecords = await photoModel.findAll({
    where: {
      id: { [Op.in]: photoIds },
    },
  });

  // console.log("photoRecords", photoRecords);

  return photoRecords;
};

module.exports = { updatePhoto, createTag, getPhotosByTag };

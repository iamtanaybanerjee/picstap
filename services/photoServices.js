const { tag: tagModel, photo: photoModel } = require("../models");

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

module.exports = { updatePhoto, createTag };

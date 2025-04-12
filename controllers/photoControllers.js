const axiosInstance = require("../lib/axios.lib");
const {
  validateSearchPhotosQueryParam,
  validatePhotoImgURL,
  validatePhotoTags,
  validateTags,
  validateTagListLength,
  validateTag,
  validateSortQuery,
} = require("../validations/index");
const { photo: photoModel } = require("../models");
const {
  updatePhoto,
  createTag,
  getPhotosByTag,
  createSearchHistory,
} = require("../services/photoServices");
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

const savePhoto = async (req, res) => {
  const photo = req.body;
  try {
    const error = validatePhotoImgURL(photo);
    if (error) return res.status(400).json({ error });

    const errors = validatePhotoTags(photo);
    if (errors.length > 0) return res.status(400).json({ errors });

    const newPhoto = await photoModel.create(photo);

    //create tags in 'tags' table in DB
    if (newPhoto.tags.length > 0) {
      for (let i = 0; i < newPhoto.tags.length; i++) {
        await createTag(newPhoto.tags, newPhoto.id);
      }
    }
    return res
      .status(201)
      .json({ message: "Photo saved successfully", newPhoto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addTagsToPhoto = async (req, res) => {
  const tagObj = req.body;
  const photoId = parseInt(req.params.photoId);

  try {
    const error = validateTags(tagObj.tags);
    if (error) return res.status(400).json({ error });

    const photoObj = await photoModel.findOne({ where: { id: photoId } });

    if (!photoObj)
      return res
        .status(404)
        .json({ error: `No photo is found with photoId ${photoId}` });

    const error2 = validateTagListLength(photoObj.tags, tagObj.tags);
    if (error2) return res.status(400).json({ error: error2 });

    photoObj.tags.push(...tagObj.tags);

    //update photo in the DB
    const updatedPhotoObj = await updatePhoto(photoId, {
      tags: photoObj.tags,
    });

    //add tags in tags table in DB
    await createTag(tagObj.tags, photoId);

    return res
      .status(200)
      .json({ message: "Tags added successfully", photo: updatedPhotoObj });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchPhotoByTag = async (req, res) => {
  const tag = req.query.tag;
  const sort = req.query.sort;
  const userId = parseInt(req.query.userId);
  try {
    const error = await validateTag(tag);
    if (error) return res.status(404).json({ error });

    const error2 = validateSortQuery(sort);
    if (error2) return res.status(400).json({ error: error2 });

    //save search history
    await createSearchHistory(userId, tag);

    //get photos
    const photos = await getPhotosByTag(tag, sort);

    return res.status(200).json({ photos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchPhotos, savePhoto, addTagsToPhoto, searchPhotoByTag };

const { tag: tagModel } = require("../models");

const validateUserBodyParams = (requestBodyObj) => {
  const errors = [];
  if (!requestBodyObj.username) errors.push("Username is required");
  if (!requestBodyObj.email) errors.push("Email is requied");
  return errors;
};

const validateUserEmail = (user) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) errors.push("Invalid email");
  return errors;
};

const validateSearchPhotosQueryParam = (query) => {
  let error;
  if (!query) error = "search-term(query) query parameter is required";
  return error;
};

const validatePhotoImgURL = (photo) => {
  let error;
  if (!photo.imageUrl.startsWith("https://images.unsplash.com/"))
    error = "Invalid image URL";
  return error;
};

const validatePhotoTags = (photo) => {
  const errors = [];
  if (photo.tags.length > 5) errors.push("More than 5 tags are not allowed");
  for (let i = 0; i < photo.tags.length; i++) {
    if (photo.tags[i].length > 20) {
      errors.push("More than 20 characters are not allowed for each tag");
      break;
    }
  }
  return errors;
};

const validateTags = (tagList) => {
  let error;
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i] === "" || tagList[i] === null || tagList[i] === undefined)
      error = "Tags must be non-empty strings";
    break;
  }
  return error;
};

const validateTagListLength = (existingTagList, toBeAddedTagList) => {
  let error;
  if (existingTagList.length + toBeAddedTagList.length > 5)
    error = "Not more than 5 tags are allowed";
  return error;
};

const validateTag = async (tag) => {
  let error;
  const tagObj = await tagModel.findOne({ where: { name: tag } });

  if (!tagObj) error = "Invalid tag";

  return error;
};

const validateSortQuery = (sortQuery) => {
  let error;

  if (sortQuery !== "ASC" && sortQuery !== "DESC" && sortQuery !== undefined)
    error = "Invalid sort query";

  return error;
};

module.exports = {
  validateUserBodyParams,
  validateUserEmail,
  validateSearchPhotosQueryParam,
  validatePhotoImgURL,
  validatePhotoTags,
  validateTags,
  validateTagListLength,
  validateTag,
  validateSortQuery,
};

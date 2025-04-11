const {
  user: userModel,
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const {
  validateUserBodyParams,
  validateUserEmail,
  validateUserId,
} = require("../validations/index");
const { trackSearchHistory } = require("../services/userServices");

const createUser = async (req, res) => {
  const user = req.body;
  try {
    const errors = validateUserBodyParams(user);
    if (errors.length > 0) return res.status(400).json({ errors: errors });

    const errors2 = validateUserEmail(user);
    if (errors2.length > 0) return res.status(400).json({ errors: errors2 });

    const emailExist = await doesEmailExist(user.email);
    if (emailExist === true)
      return res.status(400).json({ error: "Email already exist" });

    const newUser = await userModel.create(user);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const doesEmailExist = async (email) => {
  try {
    const userObj = await userModel.findOne({ where: { email } });
    if (userObj) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

const getSearchHistory = async (req, res) => {
  const userId = parseInt(req.query.userId);
  try {
    const error = await validateUserId(userId);
    if (error) return res.status(404).json({ error });

    //get all searchHistories for the userId
    const searchHistories = await trackSearchHistory(userId);

    if (searchHistories.length === 0)
      return res
        .status(404)
        .json({ message: `No search history is found for id ${userId}` });

    return res.status(200).json({ searchHistory: searchHistories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getSearchHistory };

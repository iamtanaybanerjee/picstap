const {
  user: userModel,
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const {
  validateUserBodyParams,
  validateUserEmail,
} = require("../validations/index");

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

module.exports = { createUser };

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

module.exports = { validateUserBodyParams, validateUserEmail };

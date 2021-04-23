const validator = (req) => {
  if (
    // Parameter level validation
    // Check if req.body exists
    !req.body ||
    // Check if the name property exists and isn't empty
    !req.body.name ||
    req.body.name === "" ||
    // Check if the incoming parameter is of type boolean
    typeof req.body.completed !== "boolean"
  ) {
    return true;
  }
};

module.exports = validator;

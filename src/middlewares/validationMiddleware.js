const { ValidationError } = require("../helper/errors");
const { addPostSchema } = require("../helper/validation/addPostValidation");

const addPostValidation = (req, res, next) => {
    const schema = addPostSchema

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
    }

    next();
}
  
module.exports = { addPostValidation };
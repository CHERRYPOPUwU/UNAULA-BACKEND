/**
 * Middleware to validate the request body according to a validation scheme.
 *
 * @function validateSchema
 * @param {Object} schema - The data validation scheme
 * @returns {Function} Middleware that validates req.body against the given schema and handles validation errors.
 */
export const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body); // Validates the body of the request using the safeParse safe method of the schema

    if (!result.success) {
      const errorMessages = result.error.issues.map((issue) => issue.message);
      return res.status(400).json({
        message: "Error in schema validation",
        errors: errorMessages,
      });
    }

    // req.validData = result.data;
    next();
  };
};

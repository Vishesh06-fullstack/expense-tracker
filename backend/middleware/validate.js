const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
 
  if (!result.success) {
    const firstError = result.error.issues[0];
    return res.status(400).json({
      message: firstError.message,
      field: firstError.path.join("."),
    });
  }
 
  // parsed/cleaned data (trimmed, lowercased email, etc.) req.body mein wapas daal do
  req.body = result.data;
  next();
};
 
module.exports = validate;
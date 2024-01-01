const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(
    res.status(400).json({ status: false, msg: "internal server error" })
  );

module.exports = asyncHandler;

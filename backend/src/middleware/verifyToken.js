const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = async (req, res, next) => {
  try {
    const existingToken =
      req?.cookies?.accessToken || req?.headers?.cookie?.split("=")[1];

    if (!req?.cookies || !existingToken) {
      return res
        .status(403)
        .json({ status: true, msg: "Unauthorized access - Token not found" });
    }

    jwt.verify(existingToken, process.env.JWT_SECRET, (err, data) => {
      console.log(err);
      if (err) {
        return res.status(401).json({
          status: false,
          msg: "User is unauthorized. Please check your login credentials",
        });
      }

      req.userId = data?.id;
      req.email = data?.email;
      req.user = data;
      console.log(data, "use");
      next();
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err.message || "Internal server error" });
  }
};

module.exports = { verifyToken };

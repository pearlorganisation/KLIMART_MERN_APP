// @@desc  this method is used for creating access token and storing it in cookie

const jwt = require("jsonwebtoken");
exports.accessToken = async (req, res, user, expiryTime) => {
  try {
    const accessToken = jwt.sign(
      {
        userId: user?._id,
        email: user?.email,
        name: user?.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: expiryTime }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expiresIn: "15d",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      ...(process.env.NODE_ENV === "production" && { secure: true }),
    });

    return accessToken;
  } catch (err) {
    res
      .status(400)
      .json({ status: false, message: err.message || "Internal server error" });
  }
};

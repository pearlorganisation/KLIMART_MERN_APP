const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateDetails,
  updatePassword,
  getUsersByName,
  refreshToken,
} = require("../controllers/auth");

const { verifyToken } = require("../middleware/verifyToken");

// router.get("/", protect, getUsers);

// router.get("/find?", protect, getUsersByName);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken ,  logout);
router.get("/me", verifyToken, getMe);
router.put("/updatedetails", verifyToken, updateDetails);
router.put("/updatepassword", verifyToken, updatePassword);
//changed forgotpassword route to sendotp and the controller name to sendotp
router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/refreshToken", refreshToken);
// router.post('/forgotpassword', forgotPassword)
// router.put('/resetpassword/:resettoken', resetPassword)
router.put("/resetpassword", resetPassword);

module.exports = router;

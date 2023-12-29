const crypto = require("crypto");
const { accessToken } = require("../utils/index");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("../utils/otpGenerator");

//models are imported here
const User = require("../models/User");
const otpModel = require("../models/OtpModel");

//getUser by search query
exports.getUsersByName = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });
    message = {
      success: true,
      data: users,
      message: "Success",
    };
    return res.send(message);
    res.send(users);
  } catch (error) {
    message = {
      success: false,
      data: null,
      message: error.message,
    };
    return res.send(message);
  }
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Email already exist !!" });
    user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Username already exist !!" });

    user = await User.create({
      name,
      username,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { auth, password } = req.body;

    if (!auth || !password) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "Please provide email or username in auth !!",
      });
    }

    const [user] = await User.find({})
      .or([{ username: auth }, { email: auth }])
      .select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Invalid credentials !!" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Invalid credential !!" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("accessToken");
    res.status(200).json({ success: true, msg: "logout" });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req?.userId);

    if (!currentUser) {
      return res
        .status(400)
        .json({ status: 400, msg: "No user found with given email" });
    }
    res.status(200).json({ status: true, data: currentUser });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Update user details
// @route   POST /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
  try {
    let user = await User.findById(req?.userId);
    if (!user) {
      return res.status(400).json({ status: false, msg: "No user found!!!" });
    }

    user = await User.findByIdAndUpdate(
      req.user.id,
      { ...req?.body },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    res.status(200).json({
      success: true,
      data: user,
      msg: "user details updated successfully",
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Password incorrect !!" });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/sendotp
// @access  Public
exports.sendOtp = async (req, res, next) => {
  try {
    //destructuring the email from the request body
    const email = req.body.email;

    //searching for the user in the database with the same email as in the body of request
    const user = await User.findOne({ email });

    //if user not found sending the 404 response
    if (!user) {
      // return next(new ErrorResponse("there is no user with this email", 404));
      return res
        .status(400)
        .json({ status: false, msg: "No user exists with given email id" });
    }

    //searching whether the token already exists or not
    const doc = await otpModel.findOne({ userID: user._id });

    //if document found, deleting it to store new one so that we can create a new otp
    if (doc) {
      await doc.deleteOne();
    }

    //if no document exists or deleted the token, thus creating a new one and storing in the database
    const otp = otpGenerator();

    const otpDoc = await otpModel.create({
      userID: user._id,
      email,
      otp,
    });

    //deleting the document after 2 mins
    setTimeout(async () => {
      const doc = await otpModel.findOneAndDelete({ userID: user._id });
      console.log("deleted doc", doc);
    }, 1000 * 120);

    //creating options object that needs to be sent to the
    const options = {
      email,
      subject: "Use Below Otp to verify and set new password",
      message: `${otp}`,
    };

    //calling the send mail function with arg. as the options

    await sendEmail(options);
    res.status(200).json({ status: true, msg: "otp sent successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal serv er error" });
  }

  // const [user] = await User.find({}).or([
  //   { username: req.body.auth },
  //   { email: req.body.auth }
  // ])

  // if (!user) {
  //   return next(new ErrorResponse('There is no user with that email', 404))
  // }

  // const resetToken = user.getResetPasswordToken()

  // await user.save({ validateBeforeSave: false })

  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/auth/resetpassword/${resetToken}`

  // const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: 'Password reset token',
  //     message
  //   })
  //   res.status(200).json({ success: true, data: 'Email sent' })
  // } catch (err) {
  //   console.log(err)
  //   user.resetPasswordToken = undefined
  //   user.resetPasswordExpire = undefined

  //   await user.save({ validateBeforeSave: false })

  //   return next(new ErrorResponse('Email could not be sent', 500))
  // }
};

//@desc Verify otp
//@route POST /api/v1/auth/verifyotp
//@access Private
exports.verifyOtp = async (req, res, next) => {
  // destructuring the otp from the request body

  try {
    const { otp } = req.body;

    //searching for the sent otp in the database
    const doc = await otpModel.findOne({ otp });
    if (!doc) {
      return res.status(400).json({ success: false, msg: "Otp not matched" });
    }
    console.log(doc);

    res.status(200).json({ success: true, msg: "Otp matched" });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};

// @desc    Reset password
// @route   PATCH /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (newPassword === confirmNewPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, msg: "No user found with given email id!" });
      }

      console.log(user);
    } else {
      res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ status: true, msg: "Password changes successfully!" });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};
// // Get hashed token
// const resetPasswordToken = crypto
//   .createHash('sha256')
//   .update(req.params.resettoken)
//   .digest('hex')
// console.log(resetPasswordToken)
// const user = await User.findOne({
//   resetPasswordToken,
//   resetPasswordExpire: { $gt: Date.now() }
// })
// if (!user) {
//   return next(new ErrorResponse('Invalid token', 400))
// }
// // Set new password
// user.password = req.body.password
// user.resetPasswordToken = undefined
// await user.save()
// sendTokenResponse(user, 200, res)

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  //cloning and sending the user details
  const obj = JSON.stringify(user);
  const userDetails = JSON.parse(obj);
  delete userDetails["password"];

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 1000
      // Date.now() + process.env.JWT_COOKIE_EXPIRE

    ),
    // expires: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //   // Date.now() + process.env.JWT_COOKIE_EXPIRE

    // ),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, userDetails });
};

exports.refreshToken = async (req, res) => {
  try {
    if (!req?.body?.email) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "Email id is required to generate refresh token",
      });
    }

    // Finding email id in users table
    const user = await User.findOne({ email: req?.body?.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "Email id does not exist" });
    }

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    // Clearing Existing Access Token
    res.clearCookie("accessToken");
    req.cookies = "";

    // Generating refresh Token which will be valid for 14 days
    const refreshToken = await accessToken(req, res, user, "15d");
    res.status(200).json({
      status: true,
      token: refreshToken,
      message: "Refresh Token created successfully",
    });
  } catch (err) {
    res.json({ status: false, msg: err.message || "Internal server error" });
  }
};

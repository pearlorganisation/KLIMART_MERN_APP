const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "Lastname is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Must be six characters long"],
      select: false,
    },
    mobile: {
      type: String,
      required: false,
      minlength: [10, "Must be of 10 digit"],
    },
    Address: {
      type: String,
      required: false,
    },
    Desc: {
      type: String,
      required: false,
    },
    fb: {
      type: String,
    },
    twitter: {
      type: String,
    },
    gmail: {
      type: String,
    },
    insta: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Ecrypt Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      name:this.name,
      id: this._id,
      email: this.email,
      mobile: this.mobile,
      fb: this.fb,
      twitter: this.twitter,
      insta: this.insta,
      gmail: this.gmail,
      Address: this.Address,
      createdAt :this.createdAt,
      role : this.role,
      Desc :this.Desc,
      username:this.username
    },
    process.env.JWT_SECRET,
    {
      // expiresIn: process.env.JWT_EXPIRE,
      expiresIn:"15m",
    }
  );
};

UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);

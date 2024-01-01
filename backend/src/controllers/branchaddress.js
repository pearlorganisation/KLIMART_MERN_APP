const asyncHandler = require("../middleware/async");

const branch = require("../models/branchesModel");
const validator = require("validator");

// @desc    Get address
// @route   GET /api/v1/address

exports.getAddresses = async (req, res) => {
  try {
    let data = await branch.find();
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: false,
      msg: err?.message || "Internal server error!!",
      error: err,
    });
  }
};

// @desc    Get single address
// @route   GET /api/v1/branchaddress/:id

exports.getAddress = async (req, res) => {
  try {
    const address = await branch.findById(req?.params?.id);
    if (!address) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "data is not available for particular id",
      });
    }
    res.status(200).json({ success: true, data: address });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      status: false,
      msg: err?.message || "Internal server error!!",
      error: err,
    });
  }
};

// @desc    Create address
// @route   POST /api/v1/branchaddress/

exports.createAddress = async (req, res) => {
  try {
    const uploadbranch = new branch({ ...req.body });
    const savedUploadBranch = await uploadbranch.save();
    console.log(savedUploadBranch);
    res.status(200).json({ status: "SUCCESS", data: savedUploadBranch });
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: err?.message || "Internal server error!!",
      error: err,
    });
  }
};

// @desc    Update address
// @route   PUT /api/v1/branchaddress/:id
exports.updateAddress = async (req, res) => {
  try {
    const { Pincode, Email } = req.body;
    // if (typeof(Pincode) !== "number") {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "Pincode must be a Number",
    //   });
    // }

    if (!validator.isEmail(Email)) {
      return res.status(400).json({
        success: false,
        msg: "Email must be valid",
      });
    }
    // console.log("enterd here");

    const address = await branch.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      {
        new: true,
      }
    );
    if (!address) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "data is not available for particular id",
      });
    }
    res.status(200).json({ success: true, data: address });
  } catch (err) {
    console.log("error ", err.message);
    res.status(400).json({
      status: false,
      msg: err?.message || "Internal server error!!",
      error: err,
    });
  }
};

// @desc    Delete address
// @route   DELETE /api/v1/branchaddress/:id
exports.deleteAddress = async (req, res) => {
  try {
    const address = await branch.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "data is not available for particular id",
      });
    }
    res
      .status(200)
      .json({ success: true, msg: "data is deleted successfully" });
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: err?.message || "Internal server error!!",
      error: err,
    });
  }
};

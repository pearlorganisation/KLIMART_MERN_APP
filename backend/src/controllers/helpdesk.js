const Assignment = require("../models/HelpDesk");
// const Category = require('../models/Category')

// @desc    Get Help
// @route   GET /api/v1/help
exports.getHelps = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Get single Help
// @route   GET /api/v1/Help/:id
exports.getHelp = async (req, res, next) => {
  try {
    const Help = await Assignment.findById(req.params.id);

    if (!Help) {
      return res.status(400).json({
        status: "FAILURE",
        msg: `No Help with that id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: Help });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Create Help
// @route   POST /api/v1/Help/
exports.createHelp = async (req, res, next) => {
  try {
    let assignment = await Assignment.findOne({
      assignment: req.body.assignment,
    });

    assignment = await Assignment.create({
      ...req.body,
    });

    res.status(200).json({ success: true, data: assignment });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Update Help
// @route   PUT /api/v1/Help/:id
exports.updateHelp = async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!assignment) {
      return res.status(400).json({
        status: "FAILURE",
        msg: `No Help with that id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: assignment });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

// @desc    Delete Help
// @route   DELETE /api/v1/Help/:id
exports.deleteHelp = async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(400).json({
        status: "FAILURE",
        msg: `No Help with that id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: assignment });
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, msg: err?.message || "Internal server error" });
  }
};

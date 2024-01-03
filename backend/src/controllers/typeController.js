const { json } = require("body-parser");
const Type = require("../models/Type");

// @desc    Post projects
// @route   GET /api/v1/postProjects
const uploadTypes = async (req, res) => {
  try {
    console.log(req?.body);
    // let existingTag = await Type.findOne({ types_name: req?.body?.types_name });
    // console.log(existingTag);
    // if (existingTag) {
    //   return res.json({ status: 400, msg: "Tag already exists!!" });
    // }
    const UploadTags = new Type({
      ...req?.body,
    });


    const types = await UploadTags.save();
    res.status(200).json({ status: "SUCCESS", data: types });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      error: err?.message || "Internal server error",
    });
  }
};

// @desc    Get Tag
// @route   GET /api/v1/getTags
const getTypes = async (req, res) => {
  console.log("helloo sir");
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }
  try {
  
    const Types = await Type.find();

    res.status(200).json({ status: "SUCCESS", data:Types });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Internal server error",
    });
  }
};

const getType = async (req, res) => {
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }
  try {
    // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })
    const Tags = await Type.findById(req.params.id);

    res.status(200).json({ status: "SUCCESS", data:Tags });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Internal server error",
    });
  }
};

// @desc    Update Tag
// @route   PUT /api/v1/tag/:id
const updateType = async (req, res) => {
  try {
    let existingTag = await Type.findOne({ type_name: req?.body?.type_name });
    if (existingTag) {
      console.log(existingTag, "Tuitui");
      return res.json({ status: 400, msg: "Tag already exists!!" });
    }
    const updatedType = await Type.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: updatedType });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};

// @desc    delete Tags
// @route   GET /api/v1/tags
const deleteType = async (req, res) => {
  try {
    const existingType = await Type.findById(req.params.id);
    if (!existingType) {
      return res.status(400).json({
        status: "Failure",
        Error: "No Type found with given id!!!",
      });
    }
    await Type.findByIdAndDelete(req?.params?.id);
    res.status(200).json({
      status: "Success ",
      Msg: "Deleted successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err?.message}` || "Something went wrong!!",
    });
  }
};

// @desc    get single Tags
// @route   GET /api/v1/tags/:id

const getSingleType = async (req, res) => {
  try {
    const singleType = await Type.findById(req?.params?.id);

    if (!singleType) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "No type found with given id!!" });
    }

    res.status(200).json({ status: "SUCCESS", data: singleType });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: err?.message || "Internal server error",
    });
  }
};

module.exports = {
  uploadTypes,
  getSingleType,
  getType,
  getTypes,
  deleteType,
  updateType,
};

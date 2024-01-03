const { json } = require("body-parser");
const Tag = require("../models/Tags");
const MainTags = require("../models/mainTags");



// @desc    Post projects
// @route   GET /api/v1/postProjects
const uploadTags = async (req, res) => {
  try {
    console.log("req.body.main_tag" , req.body.main_tag)
    // let existingTag = await Tag.findOne({ tags_name: req?.body?.tags_name });
    // console.log(existingTag);
    // if (existingTag) {
    //   return res.json({ status: 400, msg: "Tag already exists!!" });
    // }
    
    const UploadTags = new Tag({
      // ...req?.body,
      main_tag : req?.body?.main_tag,
      tags_name : req?.body?.tags_name,
      tags: [req?.body?.tags],
    });
    console.log("UploadTags",UploadTags)

    const Tags = await UploadTags.save();
    res.status(200).json({ status: "SUCCESS", data: Tags });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      error: err?.message || "Internal server error",
    });
  }
};

// @desc    Get Tag
// @route   GET /api/v1/getTags
const getTags = async (req, res) => {
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }
  try {
    // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })
    const Tags = await Tag.find();

    res.status(200).json({ status: "SUCCESS", Tags });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Internal server error",
    });
  }
};

const getTag = async (req, res) => {
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }
  try {
    // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })
    const Tags = await Tag.findById(req.params.id);

    res.status(200).json({ status: "SUCCESS", Tags });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Internal server error",
    });
  }
};

// @desc    Update Tag
// @route   PUT /api/v1/tag/:id
const updateTags = async (req, res) => {
  try {
    // let existingTag = await Tag.findOne({ tags_name: req?.body?.tags_name });
    // if (existingTag) {
    //   console.log(existingTag, "Tags");
    //   return res.json({ status: 400, msg: "Tag already exists!!" });
    // }
    const TagUpdate = await Tag.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: TagUpdate });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};

// @desc    delete Tags
// @route   GET /api/v1/tags
const deleteTags = async (req, res) => {
  try {
    const existingTag = await Tag.findById(req.params.id);
    if (!existingTag) {
      return res.status(400).json({
        status: "Failure",
        Error: "No Tag found with given id!!!",
      });
    }
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success ",
      Msg: "Deleted successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Something went wrong!!",
    });
  }
};

// @desc    get single Tags
// @route   GET /api/v1/tags/:id

const getSingleTag = async (req, res) => {
  try {
    const singleTag = await Tag.findById(req?.params?.id);

    if (!singleTag) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "No tag found with given id!!" });
    }

    res.status(200).json({ status: "SUCCESS", data: singleTag });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: err?.message || "Internal server error",
    });
  }
};

module.exports = {
  uploadTags,
  getSingleTag,
  getTags,
  deleteTags,
  updateTags,
  getTag,
};

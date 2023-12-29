const { json } = require("body-parser");
const Blog = require("../models/blog");
const Tags = require("../models/Tags");

// @desc    Post projects
// @route   GET /api/v1/postProjects
const uploadBlogs = async (req, res) => {
  try {
    console.log("req.body", req.body);  
    const { files } = req;
    const propertyGallery = [];
    files?.forEach((file) => {
      propertyGallery.push(file?.path);
    });
    const uploadProjects = new Blog({
      ...req?.body,
      // tags: req?.body?.tags,
      propertyGallery,
    });

    const savedUploadProjects = await uploadProjects.save();
    res.status(200).json({ status: "SUCCESS", data: savedUploadProjects });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      error: err?.message || "Internal server error",
    });
  }
};

// @desc    Get projects
// @route   GET /api/v1/getBlogs
const getBlogs = async (req, res) => {
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }           
  try {
    // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })
    // const blog = await Blog.find().populate("mainTags").populate("tags");
    const blog = await Blog.find().populate("mainTags").populate("tags");




    res.status(200).json({ status: "SUCCESS", blog });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: `${err.message}` || "Internal server error",
    });
  }
};

// api for get blog
const getfilterblog = async (req, res) => {
  res.status(200).json(res.advancedResults)
}

// @desc    Update address
// @route   PUT /api/v1/updateBlogs/:id
const updateBlogs = async (req, res) => {
  try {
    const { files } = req;
    let propertyGallery = [];

    files?.forEach((file) => {
      propertyGallery.push(file?.path);
    });
  //  console.log("req?.body" , req?.body?.mainTags)
    const existingBlog = await Blog.findById(req?.params?.id);

    if (!existingBlog) {
      return res
        .status(400)
        .json({ status: false, msg: "No blog exist with givn id!!!" });
    }

    if (files?.length <= 0) {
      propertyGallery = existingBlog?.propertyGallery;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
        propertyGallery,
      },
      { new: true }
    );
    res.status(200).json({ status: true, data: updatedBlog });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};

// @desc    delete projects
// @route   GET /api/v1/deleteProject
const deleteBlogs = async (req, res) => {
  try {
    const existingProject = await Blog.findById(req.params.id);
    if (!existingProject) {
      return res.status(400).json({
        status: "Failure",
        Error: "No project found with given id!!!",
      });
    }
    await Blog.findByIdAndDelete(req.params.id);
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

// @desc    get single blog
// @route   GET /api/v1/getBlogs/:id

const getSingleBlog = async (req, res) => {
  try {
    const singleBlog = await Blog.findById(req?.params?.id).populate("tags").populate("mainTags");
    console.log("singleBlog" , singleBlog)

    if (!singleBlog) {
      return res
        .status(400)
        .json({ status: "FAILURE", msg: "No Blog found with given id!!" });
    }

    res.status(200).json({ status: "SUCCESS", data: singleBlog });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: err?.message || "Internal server error",
    });
  }
};

module.exports = {
  getSingleBlog,
  uploadBlogs,
  getBlogs,
  deleteBlogs,
  updateBlogs,
  getfilterblog
};

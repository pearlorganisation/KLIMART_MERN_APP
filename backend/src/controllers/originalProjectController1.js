const { json } = require("body-parser");
const project = require("../models/projectsModel");

const { cloudinary } = require("../utils/multerMultiple");

// @desc    Post projects
// @route   GET /api/v1/projects/:id
const uploadProjects = async (req, res) => {
  try {
    console.log(req?.files, "files in the cloudinary");

    const data = JSON.parse(req.body.pData);
    let gallery = [
      ...(req.files.images || []),
      ...(req?.files?.picOne || []),
      ...(req?.files?.picTwo || []),
    ];
    // let gallery = [].concat(
    //   req.files.images || [],
    //   req?.files?.picOne || [],
    //   req?.files?.picTwo || [],
    //   // req?.files?.heroImg || []
    // );

    console.log("gallery@@@@@@@@@", gallery);

    const uploadProjects = new project({
      ...data,
      type: data?.type,
      propertyGallery: gallery,
      picOne: req?.files?.picOne,
      picTwo: req?.files?.picTwo,
      heroImg: req?.files?.heroImg,
    });
    const savedUploadProjects = await uploadProjects.save();
    res.status(200).json({ status: "SUCCESS", data: savedUploadProjects });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      msg: err?.message || "Internal server error",
    });
  }
};

// @desc    Get projects
// @route   GET /api/v1/projects
const getProject = async (req, res) => {
  const filterObject = {};
  let { type } = req.query;

  if (type) {
    filterObject.type = type;
  }
  try {
    // const Project = await project.find({ type: { $in: [filterObject.type ? type : ""] } })

    const Project = await project.find().populate("type");

    res.status(200).json({ status: "SUCCESS", Project });
  } catch (err) {
    res.status(400).json({
      status: "Failure",
      Error: err?.message || "Internal server error",
    });
  }
};

// @desc    Update address
// @route   PUT /api/v1/projects/:id
const updateProject = async (req, res) => {
  try {
    

    const data = JSON.parse(req.body.pData);

    const existingData = await project.findById(req?.params?.id);
    if (!existingData) {
      return res
        .status(400)
        .json({ status: false, msg: "No user found with given id!!  " });
    }
   
    // let gallery = [
    //   ...(req.files.images)
    //   // ...(req?.files?.picOne || []),
    //   // ...(req?.files?.picTwo || []),
    // ];
    let gallery = req.files.images
    if (req?.files?.picOne) {
      gallery.push(...req.files.picOne);
    }
    if (req?.files?.picTwo) {
      gallery.push(...req.files.picTwo);
    }
    

    console.log("gallery" ,gallery)
    const updatedProject = await project.findByIdAndUpdate(
      req.params.id,
      {
        ...data,
        type: data?.type,
        propertyGallery: gallery,
        picOne: req?.files?.picOne,
        picTwo: req?.files?.picTwo,
        heroImg: req?.files?.heroImg,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedProject) {
      return res.status(400).json({
        status: "FAILURE",
        msg: `No project with id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (err) {
    res.send(err.message);
  }
};
// @desc    delete projects
// @route  GET /api/v1/projects/:id
const deleteProject = async (req, res) => {
  try {
    const existingProject = await project.findById(req.params.id);
    if (!existingProject) {
      return res.status(400).json({
        status: "Failure",
        Error: "No project found with given id!!!",
      });
    }
    await project.findByIdAndDelete(req.params.id);
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

// @desc    get single projects
// @route   GET /api/v1/projects

const getSingleProject = async (req, res) => {
  try {
    let singleProject = await project.findById(req?.params.id).populate("type");
    if (!singleProject) {
      return res.status(400).json({
        status: "FAILURE",
        msg: "No project data found with given id!!",
      });
    }
    res.status(200).json({ status: "SUCCESS", data: singleProject });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};

module.exports = {
  uploadProjects,
  getProject,
  deleteProject,
  updateProject,
  getSingleProject,
};

module.exports = {
  uploadProjects,
  getProject,
  deleteProject,
  updateProject,
  getSingleProject,
};

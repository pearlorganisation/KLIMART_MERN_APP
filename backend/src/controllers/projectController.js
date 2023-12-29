const { json } = require("body-parser");
const project = require("../models/projectsModel");

const { cloudinary } = require("../utils/multerMultiple");

// @desc    Post projects
// @route   GET /api/v1/projects/:id
const uploadProjects = async (req, res) => {
  try {
    // console.log("completionDate", req?.body?.completionDate)
    // console.log("startingDate", req?.body?.startingDate)
    //   console.log(req?.files, "files in the cloudinary");
    let existingImages = [];
    let existingHeroImg;
    let existingPicOne;
    let existingPicTwo;

    const data = JSON.parse(req.body.pData);
    console.log("completionDate", req?.body?.completionDate);
    console.log("startingDate", req?.body?.startingDate);
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.heroImg
    ) {
      existingHeroImg = req?.files?.heroImg[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.picOne
    ) {
      existingPicOne = req?.files?.picOne[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.picTwo
    ) {
      existingPicTwo = req?.files?.picTwo[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.images
    ) {
      let Imagess = Object.values(req?.files.images);
      // console.log("Imagess2222",Imagess)
      for (let i = 0; i < Imagess.length; i++) {
        console.log("Imagess2222 path", Imagess[i].path);
        existingImages.push(Imagess[i].path);
        // console.log("existingImages>>>>>$$$$$$$$", existingImages);
      }
    }
    console.log("existingPicOne", existingPicOne);
    console.log("existingPicTwo", existingPicTwo);
    console.log("existingImages", existingImages);
    let gallery = [...existingImages, existingPicOne, existingPicTwo];
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
      picOne: existingPicOne,
      picTwo: existingPicTwo,
      heroImg: existingHeroImg,
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

// @desc    Get projects
// @route   GET /api/v1/projects
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

// @desc    Update address
// @route   PUT /api/v1/projects/:id
const updateProject = async (req, res) => {
  try {
    const data = JSON.parse(req.body.pData) || {};
    // console.log(data, "data");

    const existingData = await project.findById(req?.params?.id);
    if (!existingData) {
      return res
        .status(400)
        .json({ status: false, msg: "No user found with given id!!  " });
    }

    // console.log(existingData, "existingData");
    let existingHeroImg = existingData?.heroImg;
    let existingPicOne = existingData?.picOne;
    let existingPicTwo = existingData?.picTwo;
    let existingImages = [];
    let Images = existingData?.propertyGallery;
    // console.log("Images &&&", Images);
    // console.log("existingHeroImg , existingPicOne , existingPicTwo",existingHeroImg , existingPicOne ,existingPicTwo)
    // console.log("Images", Images);
    for (let i = 0; i < Images.length; i++) {
      existingImages.push(Images[i]);
      // console.log("existingImages>>>>>", existingImages);
    }

    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.heroImg
    ) {
      existingHeroImg = req?.files?.heroImg[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.picOne
    ) {
      existingPicOne = req?.files?.picOne[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.picTwo
    ) {
      existingPicTwo = req?.files?.picTwo[0]?.path;
    }
    if (
      req?.files &&
      Object.keys(req?.files).length >= 1 &&
      req?.files?.images
    ) {
      let Imagess = Object.values(req?.files.images);

      existingImages = [];
      for (let i = 0; i < Imagess.length; i++) {
        existingImages.push(Imagess[i].path);
        // console.log("existingImages>>>>>$$$$$$$$", existingImages);
      }
    }

    // console.log(
    //   "existingHeroImg existingPicOne existingPicTwo existingImages",
    //   existingHeroImg,
    //   existingPicOne,
    //   existingPicTwo,
    //   existingImages
    // );

    let cloudinaryImagesPath = [];
    if (
      req?.files &&
      req?.files["images"] &&
      Object.keys(req?.files["images"]).length >= 1
    ) {
      req?.files?.images?.forEach((item) => {
        cloudinaryImagesPath.push(item?.path);
      });
    }
    let defaultImg = []
    let defaultArr = data?.defaultArrays?.map((defaultValue)=>{
      console.log("defaultValue" , defaultValue)
         defaultImg.push(defaultValue)
    })
    console.log("defaultImg",defaultImg)
    // console.log(":Touched")// Write till here
    console.log("New", data);
    // console.log("...data?.defaultArrays" , data?.defaultArrays)
    // // const defaultArrays = { ...data?.defaultArrays };
    // console.log("defaultArrays", defaultArrays)
    // const cloudinaryImagesPaths = [...cloudinaryImagesPath];
    const newPayload = {
      ...data,
      startingDate: data?.startingDate,
      completionDate: data?.completionDate,
      type: data?.type,
      propertyGallery: [...cloudinaryImagesPath, ...defaultImg],
      picOne: existingPicOne,
      picTwo: existingPicTwo,
      heroImg: existingHeroImg,
    };
    // console.log("This is the new payload here", newPayload);
    const updatedProject = await project.findByIdAndUpdate(
      req.params.id,
      newPayload,
      {
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
    res.status(400).json({ status: "FAILURE", error: err?.message });
  }
};
// @desc    delete projects
// @route  GET /api/v1/projects/:id
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
      Error: err || "Something went wrong!!",
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

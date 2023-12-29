const path = require('path')
const fs = require('fs')
const errorResponse = require('../utils/ErrorResponse');
const homePage= require('../models/homePageModel');
const { upload } = require("../utils/multerMultiple");


// @desc    Get CareerRoute
// @route   GET /api/v1/CareerRoute
exports.getHomePage =async (req, res) => {
    try{

        let data = await homePage.find()
        res.status(200).json({status : "SUCCESS" , data : data})
      }
      catch(err){
        console.log("err",err)
        res.status(500).json({status:"FAILURE" , error : err})
      }
}


// @desc    Get single CareerRoute
// @route   GET /api/v1/CareerRoute/:id
exports.getSingleHomePage = async (req, res) => {
  try{
    const homePages = await homePage.findById(req?.params?.id)
    if (!homePages) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: homePages })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
  }


// @desc    Create CareerRoute
// @route   POST /api/v1/CareerRoute/
exports.createHomePage = async (req, res) => {
  try {
    console.log(req.files, "files")
    const { files } = req
    const Image = []
    const pictures = files.forEach((file) => {
        Image.push(file?.path)
    })
    // const payload = {
    //   header: req?.body?.header,
    //   Desc: req?.body?.Desc
    // }
    // console.log(Image);
    // console.log(payload);
    const uploadAboutPage = new homePage({ ...req.body, Image : Image })
    const savedUploadAboutPage = await uploadAboutPage.save()
    console.log(savedUploadAboutPage , "savedUploadAboutPage")
    res.status(200).json({ status: "SUCCESS", data: savedUploadAboutPage })
  }
  catch (err) {
    res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })
  }
}






// @desc    Update CareerRoute
// @route   PUT /api/v1/CareerRoute/:id
exports.updateHomePage = async (req, res) => {
  try{
 console.log("req.body=>",req.body)
 console.log("req?.files" , req?.files)
 console.log("req?.files?.length" , req?.files?.length)
 const {files} = req;
    // Image=[];
    // const pictures=files.forEach((file)=>{
    //     Image.push(file?.path)
    // });

    console.log("files",files)
    let Image = files[0]
    console.log("Image $4", Image)
    let existingData = await homePage.findById(req?.params?.id)
   if(files?.length<=0){
   Image= existingData?.Image
   }
    const homePages = await homePage.findByIdAndUpdate(req?.params?.id, 
      {...req?.body,
        Image : Image?.path
      }, 
      {
      new: true
    })
    if (!homePages) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: homePages })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}




// @desc    Delete CareerRoute
// @route   DELETE /api/v1/CareerRoute/:id
exports.deleteHomePage = async (req, res) => {
  try{
    const homePages = await homePage.findByIdAndDelete(req?.params?.id)
   if (!homePages) {
        return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
      }
    res.status(200).json({ success: true, msg:"data is deleted successfully" })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}
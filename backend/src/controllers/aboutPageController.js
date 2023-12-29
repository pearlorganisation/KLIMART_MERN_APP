const path = require('path')
const fs = require('fs')
const errorResponse = require('../utils/ErrorResponse');
const AboutPage= require('../models/aboutPageModel');
const { upload } = require("../utils/multerMultiple");


// @desc    Get CareerRoute
// @route   GET /api/v1/CareerRoute
exports.getAboutPage =async (req, res) => {
    try{

        let data = await AboutPage.find()
        res.status(200).json({status : "SUCCESS" , data : data})
      }
      catch(err){
        console.log("err",err)
        res.status(500).json({status:"FAILURE" , error : err})
      }
}


// @desc    Get single CareerRoute
// @route   GET /api/v1/CareerRoute/:id
exports.getSingleAboutPage = async (req, res) => {
  try{
    const aboutPage = await AboutPage.findById(req?.params?.id)
    if (!aboutPage) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: aboutPage })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
  }


// @desc    Create CareerRoute
// @route   POST /api/v1/CareerRoute/
exports.createAboutPage = async (req, res) => {
  try {
    console.log(req.files, "files")
    const { files } = req
    const Image = []
    const pictures = files.forEach((file) => {
        Image.push(file?.path)
    })
    const payload = {
      header: req?.body?.header,
      Desc: req?.body?.Desc
    }
    console.log(Image);
    console.log(payload);
    const uploadAboutPage = new AboutPage({ ...payload, Image })
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
exports.updateAboutPage = async (req, res) => {
  try{
 console.log("req.body",req.body)
    const {files} = req;
    // Image=[];
    // const pictures=files.forEach((file)=>{
    //     Image.push(file?.path)
    // });

    console.log("files",files)
    let Image = files[0]
    console.log("Image $4", Image)
    let existingData = await AboutPage.findById(req?.params?.id)
   if(files?.length<=0){
   Image= existingData?.Image
   }
  //  console.log("pro gall", propertyGallery)
    const aboutPage = await AboutPage.findByIdAndUpdate(req?.params?.id, 
      {...req?.body,
        Image : Image?.path
      }, 
      {
      new: true
    })
    if (!aboutPage) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: aboutPage })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}




// @desc    Delete CareerRoute
// @route   DELETE /api/v1/CareerRoute/:id
exports.deleteAboutPage = async (req, res) => {
  try{
    const aboutPage = await AboutPage.findByIdAndDelete(req?.params?.id)
   if (!aboutPage) {
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
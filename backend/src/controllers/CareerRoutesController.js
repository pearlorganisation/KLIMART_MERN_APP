const path = require('path')
const fs = require('fs')
const errorResponse = require('../utils/ErrorResponse');
const careerPage= require('../models/careerPageModel');
const { upload } = require("../utils/multerMultiple");


// @desc    Get CareerRoute
// @route   GET /api/v1/CareerRoute
exports.getCareerRoutes =async (req, res) => {
    try{

        let data = await careerPage.find()
        res.status(200).json({status : "SUCCESS" , data : data})
      }
      catch(err){
        console.log("err",err)
        res.status(500).json({status:"FAILURE" , error : err})
      }
}


// @desc    Get single CareerRoute
// @route   GET /api/v1/CareerRoute/:id
exports.getCareerRoute = async (req, res) => {
  try{
    const career = await careerPage.findById(req?.params?.id)
    if (!career) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: career })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
  }


// @desc    Create CareerRoute
// @route   POST /api/v1/CareerRoute/
exports.createCareerRoute = async (req, res) => {
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
    const uploadProjects = new careerPage({ ...payload, Image })
    const savedUploadProjects = await uploadProjects.save()
    console.log(savedUploadProjects)
    res.status(200).json({ status: "SUCCESS", data: savedUploadProjects })
  }
  catch (err) {
    res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })
  }
}






// @desc    Update CareerRoute
// @route   PUT /api/v1/CareerRoute/:id
exports.updateCareerRoute = async (req, res) => {
  try{
 console.log("req.body",req.body)
    const {files} = req;
    Image=[];
    const pictures=files.forEach((file)=>{
      Image.push(file?.path)
    });
    console.log("files",files)
    let existingData = await careerPage.findById(req?.params?.id)
   if(files?.length<=0){
    Image= existingData?.Image
   }
  //  console.log("pro gall", propertyGallery)
    const career = await careerPage.findByIdAndUpdate(req?.params?.id, 
      {...req?.body,Image : Image}, 
      {
      new: true
    })
    if (!career) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: career })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}




// exports.updateEmploye = async (req, res) => {
//   try {
//     const employeeData = await careerRoute.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req?.body,
//         propertyGallery: req?.files?.eventImages,
//       },
//       { new: true }
     
//     );
//     const savedEmployeeData = await employeeData.save();
//     console.log(savedEmployeeData);
//     res.status(201).json({ status: true, data: savedEmployeeData });
//   } catch (err) {
//     res
//       .status(400)
//       .json({ status: false, msg: err?.message || "Internal server error!!" });
//   }
// };




// @desc    Delete CareerRoute
// @route   DELETE /api/v1/CareerRoute/:id
exports.deleteCareerRoute = async (req, res) => {
  try{
    const career = await careerPage.findByIdAndDelete(req?.params?.id)
   if (!career) {
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
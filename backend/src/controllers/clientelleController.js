const path = require('path')
const fs = require('fs')
const errorResponse = require('../utils/ErrorResponse');
const ClientellePage= require('../models/ClientelleModal');
const { upload } = require("../utils/multerMultiple");


// @desc    Get CareerRoute
// @route   GET /api/v1/CareerRoute
exports.getClientellePage =async (req, res) => {
    try{

        let data = await ClientellePage.find()
        res.status(200).json({status : "SUCCESS" , data : data})
      }
      catch(err){
        console.log("err",err)
        res.status(500).json({status:"FAILURE" , error : err})
      }
}


// @desc    Get single CareerRoute
// @route   GET /api/v1/CareerRoute/:id
exports.getSingleClientellePage = async (req, res) => {
  try{
    const Page = await ClientellePage.findById(req?.params?.id)
    if (!Page) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: Page })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
  }


// @desc    Create CareerRoute
// @route   POST /api/v1/CareerRoute/
exports.createClientellePage = async (req, res) => {
  try {
    console.log(req.files, "files")
    const { files } = req
    const Image = []
    const pictures = files.forEach((file) => {
        Image.push(file?.path)
    })

    console.log(Image,"Image");
    
    const uploadClientellePage = new ClientellePage({ Image })
    const savedUploadPage = await uploadClientellePage.save()
    console.log(savedUploadPage , "savedUploadPage")
    res.status(200).json({ status: "SUCCESS", data: savedUploadPage })
  }
  catch (err) {
    res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })
  }
}






// @desc    Update CareerRoute
// @route   PUT /api/v1/CareerRoute/:id
exports.updateClientellePage = async (req, res) => {
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
    let existingData = await ClientellePage.findById(req?.params?.id)
   if(files?.length<=0){
   Image= existingData?.Image
   }
  //  console.log("pro gall", propertyGallery)
    const Page = await ClientellePage.findByIdAndUpdate(req?.params?.id, 
     
       { Image : Image?.path},
    
      {
      new: true
    })
    if (!Page) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: Page })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}




// @desc    Delete CareerRoute
// @route   DELETE /api/v1/CareerRoute/:id
exports.deleteClientellePage = async (req, res) => {
  try{
    const Page = await ClientellePage.findByIdAndDelete(req?.params?.id)
   if (!Page) {
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
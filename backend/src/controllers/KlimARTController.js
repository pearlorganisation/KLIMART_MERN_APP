const path = require('path')
const fs = require('fs')
const errorResponse = require('../utils/ErrorResponse');
const klimARTModal= require('../models/klimARTModal');
const { upload } = require("../utils/multerMultiple");


// @desc    Get CareerRoute
// @route   GET /api/v1/CareerRoute
exports.getKlimART =async (req, res) => {
    try{

        let data = await klimARTModal.find()
        res.status(200).json({status : "SUCCESS" , data : data})
      }
      catch(err){
        console.log("err",err)
        res.status(500).json({status:"FAILURE" , error : err})
      }
}


// @desc    Get single CareerRoute
// @route   GET /api/v1/CareerRoute/:id
exports.getSingleKlimART = async (req, res) => {
  try{
    const data = await klimARTModal.findById(req?.params?.id)
    if (!data) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: data })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
  }


// @desc    Create CareerRoute
// @route   POST /api/v1/CareerRoute/
exports.createKlimART = async (req, res) => {
  try {
   console.log("req?.body", req?.body)
   
    
    

    // console.log(payload , "payload");
    const uploadklimARTModal = new klimARTModal({
        header : req?.body?.header,
        Desc : req?.body?.Desc
    })
    const savedUploadklimART = await uploadklimARTModal.save()
    console.log(savedUploadklimART , "savedUploadklimART")
    res.status(200).json({ status: "SUCCESS", data: savedUploadklimART })
  }
  catch (err) {
    res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })
  }
}






// @desc    Update CareerRoute
// @route   PUT /api/v1/CareerRoute/:id
exports.updateKlimART = async (req, res) => {
  try{
 console.log("req.body",req.body)

 
    const data = await klimARTModal.findByIdAndUpdate(req?.params?.id, 
      {...req?.body,
        
      }, 
      {
      new: true
    })
    if (!data) {
      return res.status(400).json({ status: "FAILURE", msg: "data is not available for particular id" })
    }
    res.status(200).json({ success: true, data: data })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" ,error : err});
  }
}




// @desc    Delete CareerRoute
// @route   DELETE /api/v1/CareerRoute/:id
exports.deleteKlimART = async (req, res) => {
  try{
    const data = await klimARTModal.findByIdAndDelete(req?.params?.id)
   if (!data) {
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
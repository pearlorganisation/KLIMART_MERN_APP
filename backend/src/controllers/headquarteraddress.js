const asyncHandler = require('../middleware/async')


const HeadQuarter = require('../models/HeadquarterAddress')
const validator = require('validator')


// @desc    Get address
// @route   GET /api/v1/address


exports.getAddresses = async (req, res, next) => {
  try{

    let data = await HeadQuarter.find()
    res.status(200).json({status : "SUCCESS" , data : data})
  }
  catch(err){
    console.log("err",err)
    res.status(500).json({status:"FAILURE" , error : err})
  }
}


// @desc    Get single address
// @route   GET /api/v1/address/:id


exports.getAddress = async (req, res, next) => {
  try{

    const address = await HeadQuarter.findById(req.params.id)
  
  
    if (!address) {
      return next(
        new res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })
  
  
      )
    }
  
  
    res.status(200).json({ success: true, data: address })
  }
  catch(err){
    console.log("err",err)
    res.status(500).json({status:"FAILURE" , error : err})
  }
  
}


// @desc    Create address
// @route   POST /api/v1/address/


exports.createAddress = async (req, res) => {
  try{

    let question = await HeadQuarter.findOne({ question: req.body.question })
    //   //check if question is repeated or not
    //   if (question) {
    //     return next(new ErrorResponse('Question already exists', 400))
    //   }
    question = await HeadQuarter.create({
      ...req.body
    })
    res.status(200).json({ success: true, data: question })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" });
}
  
}


// @desc    Update address
// @route   PUT /api/v1/address/:id
exports.updateAddress = async (req, res) => {
  try{
    

 if(!validator.isEmail(req?.body?.Email)){
  return res.status(400).json({success:false , msg:"Email must be valid"})

 }

    const address = await HeadQuarter.findByIdAndUpdate(req.params.id, 
      { $set: { ...req.body } },
      {
        new: true,
      }
    )
  
  
    if (!address) {
      return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })
  
  
    }
  
  
    res.status(200).json({ success: true, data: address })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" });
}
  
}


// @desc    Delete address
// @route   DELETE /api/v1/address/:id
exports.deleteAddress = async (req, res, next) => {
  try{

    const address = await HeadQuarter.findByIdAndDelete(req.params.id)
  
  
    if (!address) {
      return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })
  
  
    }
  
  
    res.status(200).json({ success: true, msg : "headQuarter data is deleted successfully" })
  }
  catch(err){
    res
    .status(400)
    .json({ status: false, msg: err?.message || "Internal server error!!" });

  }
}

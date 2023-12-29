const path = require('path')
const fs = require('fs')
const asyncHandler = require('../middleware/async')
const errorResponse = require('../utils/ErrorResponse');
const emplyee = require('../models/emplyee');
const { upload } = require("../utils/multerMultiple");
const { proppatch } = require('../routes/employeRoute');


// @desc    Get employees
// @route   GET /api/v1/employees
exports.getEmployees = async(req, res) => {
  try{

    console.log("hello world")
    let data = await emplyee.find()
  
    res.status(200).json({status : "SUCCESS" , data : data})
  }
  catch(err){
    console.log("error" , err)
    res.status(400).json({status:"FAILURE" , error : err})
  }
}


// @desc    Get single employees
// @route   GET /api/v1/employees/:id
exports.getEmployee = async (req, res) => {
  try{

    const category = await emplyee.findById(req?.params.id)
  
  
    if (!category) {
      return next(
        new res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })
  
  
      )
    }
  
  
    res.status(200).json({ success: true, data: category })
  }
  catch(err){
    console.log("err",err)
    res.status(400).json({status:"FAILURE" , error : err})
  }
}


// @desc    Create employees
// @route   POST /api/v1/employees/
exports.createEmployee = async (req, res) => {
  try {


    console.log(req.files, "files")
    const { files } = req
    const propertyGallery = []
    const pictures = files.forEach((file) => {
      propertyGallery.push(file?.path)
    })
    const payload = {
      Name: req?.body?.Name,
      EmployeeId: req?.body?.EmployeeId, Address: req?.body?.Address
    }
    console.log(propertyGallery);
    console.log(payload);


    const uploadProjects = new emplyee({ ...payload, propertyGallery })
    const savedUploadProjects = await uploadProjects.save()
    console.log(savedUploadProjects)
    res.status(200).json({ status: "SUCCESS", data: savedUploadProjects })
  }
  catch (err) {
    res.status(400).json({ status: "Failure", error: `${err?.message?.split(":")[2]}` || `Internal server error-${err.message}` })

  }
}






// @desc    Update employees
// @route   PUT /api/v1/employees/:id
exports.updateEmployee = async (req, res) => {
  try{

    const {files} = req;
    console.log("files" , files)
    propertyGallery=[];
    const pictures=files.forEach((file)=>{
      propertyGallery.push(file?.path)
    });
    const existingData = await emplyee.findById(req?.params?.id)
    if(files.length<=0){
      propertyGallery=existingData.propertyGallery
      console.log("propertyGallery@",propertyGallery)
    }

    console.log(propertyGallery);
    const address = await emplyee.findByIdAndUpdate(req?.params?.id, 
      
      {$set : {...req.body , propertyGallery : propertyGallery}}
      , {
      runValidators: true,
      new: true
    })
  
  
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




exports.updateEmploye = async (req, res) => {
  try {
    const employeeData = await emplyee.findByIdAndUpdate(
      req.params.id,
      {
        ...req?.body,
        propertyGallery: req?.files?.eventImages,
      },
      { new: true }
     
    );
    const savedEmployeeData = await employeeData.save();
    console.log(savedEmployeeData);
    res.status(201).json({ status: true, data: savedEmployeeData });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error!!" });
  }
};




// // @desc    Delete employees
// // @route   DELETE /api/v1/employees/:id
// exports.deleteEmployee = asyncHandler(async (req, res, next) => {
//   // const category = await Category.findByIdAndDelete(req.params.id)
//   let category = await Category.findById(req.params.id)


//   if (!category) {
//     return next(
//       new ErrorResponse(`No category with id of ${req.params.id}`, 404)
//     )
//   }


//   if (category && category.photo !== 'no-photo.jpg') {
//     fs.unlink(
//       `${process.env.FILE_UPLOAD_PATH}/${category.photo}`,
//       async (err) => {
//         await category.remove()
//         if (err) {
//           return next(
//             new ErrorResponse(
//               `Something went wrong, couldn't delete category photo`,
//               500
//             )
//           )
//         }


//         return res.status(200).json({ success: true, category })
//       }
//     )
//   } else {
//     await category.remove()
//     return res.status(200).json({ success: true, category })
//   }
// })


// @desc    Delete employees
// @route   DELETE /api/v1/employees/:id
exports.deleteEmployee = async (req, res) => {
  try{

    const employee = await emplyee.findByIdAndDelete(req.params.id)
  
  
    if (!employee) {
      return res.status(400).json({ status: "FAILURE", msg: "No Employee data!!" })
  
  
    }
  
  
    res.status(200).json({ success: true, msg:"Employee data is deleted successfully"})
  }
  catch(err){

    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error!!" });
  }
}


// // @desc    Upload photo for category
// // @route   PUT /api/v1/categories/:id/photo
// // @access  Private Admin
// exports.categoryPhotoUpload = asyncHandler(async (req, res, next) => {
//   const category = await Category.findById(req.params.id)
//   if (!category) {
//     return next(
//       new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
//     )
//   }


//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 404))
//   }


//   const photo = req.files.photo


//   if (!photo.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image photo`, 404))
//   }


//   if (photo.size > process.env.MAX_FILE_UPLO
//       new ErrorResponse(
//         `Please upload an image less than ${
//           process.env.MAX_FILE_UPLOAD / 1000 / 1000
//         }mb`,
//         404
//       )
//     )
//   }


//   photo.name = `photo-${category._id}${path.parse(photo.name).ext}`


//   photo.mv(`${process.env.FILE_UPLOAD_PATH}/${photo.name}`, async (err) => {
//     if (err) {
//       console.error(err)
//       return next(new ErrorResponse(`Problem with photo upload`, 500))
//     }


//     await Category.findByIdAndUpdate(req.params.id, { photo: photo.name })


//     res.status(200).json({ success: true, data: photo.name })
//   })
// })

const { getInTouchValidation } = require("../Validations/GetInTouchValidation");
const { sendEmail } = require("../email");
const { GetInTouchModel } = require("../models/GetInTouchModel");
// @localhosst:4000/api/v1/touch
//Schema is in Model==>Get in Touch
exports.CreateGetInTouch = async (req, res) => {
 const datum = req.body;
 let result = getInTouchValidation(datum);
 if (result.error) {
  return res.status(400).json({
   success: false,
   Error: result.error.details[0].message,
  });
 }
 try {
  const { name, email, contact, bhk, budget, area, location, category, subCategory } = req.body;
  let obj = {
   Heading: `A New Project Detail Request`,
   name,
   email,
   contact,
   bhk,
   budget,
   area,
   location,
   category,
   subCategory,
  };
  sendEmail(
   "a0423355@gmail.com",
   "New Project Request",
   "Welcome message content",
   obj,
  );
  let payload = new GetInTouchModel(req.body);

  await payload.save();
  console.log("This is ciontxcat",payload);
  res.status(200).json({
   success: true,
   data: payload,
  });
 } catch (error) {
  res.status(400).json({
   status: false,
   Error: error.message,
  });
 }
};
exports.GetInTouchDetails = async (_, res) => {
 try {
  let data = await GetInTouchModel.find();
  res.status(200).json({
   data,
   status: true,
  });
 } catch (error) {
  res.status(400).json({
   status: false,
   Error: error.message,
  });
 }
};

exports.GetInTouchOneDetail = async (req, res) => {
 const getintouch = await GetInTouchModel.findById(req.params.id)

 if (!getintouch) {
  return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

 }

 res.status(200).json({ success: true, data: getintouch })
}


exports.updateGetInTouch = async (req, res, next) => {
 const getintouch = await GetInTouchModel.findByIdAndUpdate(req?.params?.id, req.body, {
  runValidators: true,
  new: true
 })

 if (!getintouch) {
  return res.status(400).json({ status: "FAILURE", msg: "Internal server error !!" })

 }

 res.status(200).json({ success: true, data: getintouch })
}


exports.deleteGetInTouch = async (req, res) => {
 try {
    console.log("delete id backend:::::::" ,req.params.id)
  const existinggetintouh = await GetInTouchModel.findById(req.params.id);
  if (!existinggetintouh) {
   return res.status(400).json({
    status: "Failure",
    Error: "No Getintouch found with given id!!!",
   });
  }
  await GetInTouchModel.findByIdAndDelete(req.params.id);
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


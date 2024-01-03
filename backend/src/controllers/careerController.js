const { sendEmail } = require("../email");
const path = require("path");
const validationResult = require("express-validator").validationResult;
const CareerModel = require("../models/careerModel.js").CareerModel;
const careerValidation =
  require("../Validations/CareerValidation.js").careerValidation;

exports.CareerCreate = async (req, res) => {
  // console.log(req?.body, "body^^^^^");
  // console.log("req.files", req.files.cv[0]);
  const datum = JSON.parse(req?.body?.document);
  // console.log("datum&&", datum);
  // const protocol = req.protocol;
  // console.log("Protocol inside career", protocol);
  let result = careerValidation(datum);
  if (result.error) {
    return res.status(400).json({
      success: false,
      Error: result.error.details[0].message,
    });
  }

  const today = new Date();

  // Get the day, month, and year components
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = today.getFullYear();

  // Format the components as strings with leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Create the final formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  try {
    const cvFile = req.files.cv[0];
    let payload = await CareerModel.create({
      fname: datum?.fname,
      lname: datum.lname,
      role: datum.role,
      contact: datum.contact,
      city: datum.city,
      experience: datum.experience,
      email: datum.email,
      education: datum.education,
      cv: cvFile?.path,
      date: formattedDate,
    });
    const obj = {
      Heading: `Candidate Profile Details`,
      name: datum?.fname + " " + datum?.lname,
      role: datum?.role,
      contact: datum?.contact,
      city: datum?.city,
      experience: `${datum?.experience} Years`,
      email: datum?.email,
      education: datum?.education,
      cv: cvFile?.path,
      // way,
    };
    //This route is to send the mail to a user
    sendEmail(
      "a0423355@gmail.com",
      "New Job Application Request",
      "Welcome message content",
      obj
    );
    // console.log("Payload", payload);
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
exports.CareerDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let payload = await CareerModel.find();
  try {
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      Error: error.message,
    });
  }
  // console.log(payload)
};

exports.deleteCareer = async (req, res) => {
  try {
    let existingCareer = await CareerModel.findById(req?.params?.id);
    if (!existingCareer) {
      return res.status(400).json({
        status: false,
        Error: "No career data found with given id!!",
      });
    }

    await CareerModel.findByIdAndDelete(req?.params?.id);
    res.status(200).json({ status: true, msg: "deleted successfully!!" });
  } catch (err) {
    res
      .status(400)
      .json({ status: false, msg: err?.message || "Internal server error" });
  }
};
exports.updateCareer = async (req, res) => {
  try {
    const { id } = req?.params;
    const newData = await CareerModel.findByIdAndUpdate(id, {
      $set: req?.body,
    });
    return res.status(200).json({
      success: false,
      message: "Data has been updated successfully.",
      data: newData,
    });
  } catch (error) {
     return res.status(400).json({
       success: false,
       message: "Data has been updated successfully.",
       data: newData,
     });
  }
};

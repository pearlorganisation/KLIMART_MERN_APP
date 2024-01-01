//ES5
const ContactModel = require("../models/contactModel.js").ContactModel;
const validationResult = require("express-validator").validationResult;

exports.ContactCreate = async (req, res) => {
  try {
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

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let payload = await ContactModel.create({
      ...req.body,
      date: formattedDate,
    });
    res.status(200).json({
      data: payload,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      Error: error?.message,
    });
  }

  // res.send("Data");
};
exports.ContactDetails = async (_, res) => {
  try {
    let data = await ContactModel.find();
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

exports.deleteContact = async (req, res) => {
  try {
    let existingContact = await ContactModel.findById(req?.params?.id);
    if (!existingContact) {
      return res.status(400).json({
        status: false,
        Error: "No contact data found with given id!!",
      });
    }

    await ContactModel.findByIdAndDelete(req?.params?.id);
    res.status(200).json({ status: true, msg: "contact deleted!!" });
  } catch (error) {
    res.status(400).json({ status: false, Error: error.message });
  }
};
exports.updateContact = async (req, res) => {
  try {
    const { id } = req?.params;
    const newData = await ContactModel.findByIdAndUpdate(id, {
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
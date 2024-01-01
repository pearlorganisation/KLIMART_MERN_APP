const { json } = require("body-parser");
const pages = require("../models/pages");
// @desc    Post pagess
// @route   GET /api/v1/pages
const CreatePages = async (req, res) => {
  const payload = {
    page_name: req?.body?.page_name,
    content: req?.body?.content,
  };
  const uploadPages = new pages({ ...payload });
  const savedUploadPages = await uploadPages.save();
  res.status(200).json({ status: "SUCCESS", data: savedUploadPages });
};
// @desc    Get pages
// @route   GET /api/v1/pages
const getPages = async (req, res) => {
  const page = await pages.find();
  res.status(200).json({ status: "SUCCESS", page });
};

// @desc    Update pages
// @route   PUT /api/v1/updatePages/:id
const deletePages = async (req, res) => {
  const page = await pages.findByIdAndDelete(req.params.id);

  if (!page) {
    return res
      .status(400)
      .json({ status: "FAILURE", msg: "Internal server error !!" });
  }
  res.status(200).json({ success: true, data: page });
};
const getPage = async (req, res) => {
  const page = await pages.findById(req.params.id);
  res.status(200).json({ status: "SUCCESS", page });
};
const updatePages = async (req, res) => {
  const page = await pages.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!page) {
    return res
      .status(400)
      .json({ status: "FAILURE", msg: "Internal server error !!" });
  }

  res.status(200).json({ success: true, data: page });
};
module.exports = { CreatePages, getPages, deletePages, updatePages ,getPage};

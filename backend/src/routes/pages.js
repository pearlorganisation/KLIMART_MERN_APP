const express = require("express");
const router = express.Router();
const {
  CreatePages,
  getPages,
  deletePages,
  updatePages,
  getPage,
} = require("../controllers/pages");
// const { upload } = require("../utils/multerMultiple")
const blog = require("../models/pages");

const advancedResults = require("../middleware/advancedResults");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(getPages).post(verifyToken , CreatePages);
router.route("/:id").get(getPage);
router.route("/:id").delete(verifyToken , deletePages).put(verifyToken , updatePages);

module.exports = router;

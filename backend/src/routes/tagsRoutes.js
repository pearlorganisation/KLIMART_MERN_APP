const express = require("express");
const router = express.Router();
const {
  uploadTags,
  getTags,
  deleteTags,
  updateTags,
  getSingleTag,
} = require("../controllers/tagController");
const tag = require("../models/Tags");

const advancedResults = require("../middleware/advancedResults");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(getTags).post(verifyToken , uploadTags);
router.route("/:id").delete(verifyToken , deleteTags).put(verifyToken , updateTags).get(getSingleTag);

module.exports = router;

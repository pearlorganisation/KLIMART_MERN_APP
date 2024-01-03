const express = require("express");
const router = express.Router();
const {
  getSingleBlog,
  uploadBlogs,
  getBlogs,
  deleteBlogs,
  updateBlogs,
  getfilterblog
} = require("../controllers/blogController");
const { upload } = require("../utils/multerMultiple");
const blog = require("../models/blog");

const advancedResults = require("../middleware/advancedResults");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(getBlogs).post(verifyToken , upload.array("images"), uploadBlogs);
router.route('/blog').get(advancedResults(blog), getfilterblog)
router
  .route("/:id")
  .delete(verifyToken , deleteBlogs)
  .put(verifyToken , upload.array("images"), updateBlogs)
  .get(getSingleBlog);

module.exports = router;

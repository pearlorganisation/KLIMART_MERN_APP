const express = require('express')
const {
    createBlogPage,
    getBlogPage,
    getSingleBlogPage,
    updateBlogPage,
    deleteBlogPage
} = require('../controllers/blogPageController')


const { upload } = require("../utils/multerMultiple")
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router()


router
  .route('/')
  .get(getBlogPage)
  .post(verifyToken , upload.array("images"), createBlogPage)

router
  .route('/:id')
  .get(getSingleBlogPage)
  .put(verifyToken , upload.array("images"),updateBlogPage)
  .delete(verifyToken , deleteBlogPage)

module.exports = router



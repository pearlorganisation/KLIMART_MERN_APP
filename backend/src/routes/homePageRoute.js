const express = require('express')
const {
    createHomePage,
    getHomePage,
    getSingleHomePage,
    updateHomePage,
    deleteHomePage
} = require('../controllers/homePageController')


const { upload } = require("../utils/multerMultiple")

const router = express.Router()

const { verifyToken } = require("../middleware/verifyToken");
router
  .route('/')
  .get( getHomePage)
  .post(verifyToken , upload.array("images"), createHomePage)

router
  .route('/:id')
  .get( getSingleHomePage)
  .put(verifyToken , upload.array("images"),updateHomePage)
  .delete(verifyToken , deleteHomePage)

module.exports = router



const express = require('express')
const {
    createAboutPage,
    getAboutPage,
    getSingleAboutPage,
    updateAboutPage,
    deleteAboutPage
} = require('../controllers/aboutPageController')


const { upload } = require("../utils/multerMultiple")
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router()


router
  .route('/')
  .get( getAboutPage)
  .post(verifyToken , upload.array("images"), createAboutPage)

router
  .route('/:id')
  .get( getSingleAboutPage)
  .put( verifyToken , upload.array("images"),updateAboutPage)
  .delete(verifyToken , deleteAboutPage)

module.exports = router



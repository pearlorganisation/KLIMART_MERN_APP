const express = require('express')
const {
  getCareerRoute,
  getCareerRoutes,
  createCareerRoute,
  updateCareerRoute,
  deleteCareerRoute
} = require('../controllers/CareerRoutesController')


const { upload } = require("../utils/multerMultiple")

const CareerPageRoute = require('../models/careerPageModel')
const router = express.Router()

const advancedResults = require('../middleware/advancedResults')
const { verifyToken } = require("../middleware/verifyToken");
router
  .route('/')
  .get( getCareerRoutes)
  .post(verifyToken , upload.array("images"), createCareerRoute)

router
  .route('/:id')
  .get( getCareerRoute)
  .put(verifyToken , upload.array("images"),updateCareerRoute)
  .delete(verifyToken , deleteCareerRoute)

module.exports = router



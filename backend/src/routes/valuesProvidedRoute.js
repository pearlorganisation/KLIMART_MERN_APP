const express = require('express')
const {
    createValuesProvided,
    getValuesProvided,
    getSingleValuesProvided,
    updateValuesProvided,
    deleteValuesProvided
} = require('../controllers/valuesProvidedController')


const { upload } = require("../utils/multerMultiple")
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router()


router
  .route('/')
  .get(getValuesProvided)
  .post(verifyToken , upload.array("images"), createValuesProvided)

router
  .route('/:id')
  .get(getSingleValuesProvided)
  .put(verifyToken , upload.array("images"),updateValuesProvided)
  .delete(verifyToken , deleteValuesProvided)

module.exports = router



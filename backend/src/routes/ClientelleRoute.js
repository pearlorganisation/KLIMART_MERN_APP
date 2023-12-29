const express = require('express')
const {
    createClientellePage,
    getClientellePage,
    getSingleClientellePage,
    updateClientellePage,
    deleteClientellePage
} = require('../controllers/clientelleController')


const { upload } = require("../utils/multerMultiple")
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router()


router
  .route('/')
  .get( getClientellePage)
  .post(verifyToken , upload.array("images"), createClientellePage)

router
  .route('/:id')
  .get(getSingleClientellePage)
  .put(verifyToken , upload.array("images"),updateClientellePage)
  .delete(verifyToken , deleteClientellePage)

module.exports = router



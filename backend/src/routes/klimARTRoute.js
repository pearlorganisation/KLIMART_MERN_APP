const express = require('express')
const {
    createKlimART,
    getKlimART,
    getSingleKlimART,
    updateKlimART,
    deleteKlimART
} = require('../controllers/KlimARTController')


const { upload } = require("../utils/multerMultiple")
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router()


router
  .route('/')
  .get(getKlimART)
  .post(verifyToken , createKlimART)

router
  .route('/:id')
  .get(getSingleKlimART)
  .put(verifyToken , updateKlimART)
  .delete(verifyToken , deleteKlimART)

module.exports = router



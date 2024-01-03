const express = require('express')
const { createMainTag, getSingleMainTag, getMainTag } = require('../controllers/mainTagController')
const router = express.Router()


// const { verifyToken } = require("../middleware/verifyToken");
router.route('/').post(createMainTag).get(getMainTag)
router.route('/:id').get(getSingleMainTag)



module.exports = router
const express = require('express')
const {
  getEmployee,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController')


const { upload } = require("../utils/multerMultiple")


const router = express.Router()




const advancedResults = require('../middleware/advancedResults')
// const { protect } = require('../middleware/auth')


const { verifyToken } = require("../middleware/verifyToken");

router
  .route('/')
  .get(getEmployees)
  .post(verifyToken ,  upload.array("images"), createEmployee)




router
  .route('/:id')
  .get(getEmployee)
  .put(verifyToken , upload.array("images"),updateEmployee)
  .delete(verifyToken , deleteEmployee)






module.exports = router


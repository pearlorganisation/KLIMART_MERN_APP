//ES5
const express = require("express");
const router = express.Router();

const careerController = require("../controllers/careerController.js");
const { uploads } = require("../utils/multerWithCloudinary.js");


const CareerCreate = careerController.CareerCreate;
// const validateMimeType = multerUploadUtils.validateMimeType;
const { verifyToken } = require("../middleware/verifyToken.js");

// Post route to post a new data from user including cv
router.post("/" , uploads.fields([{name : "cv"}]) ,  CareerCreate);
router.get("/", careerController.CareerDetails);
router.delete("/:id", verifyToken, careerController.deleteCareer);
router.patch("/update/:id", verifyToken , careerController.updateCareer);

module.exports = router;

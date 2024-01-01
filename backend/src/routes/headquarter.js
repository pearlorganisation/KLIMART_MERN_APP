const express = require("express");
const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/headquarteraddress");

const Address = require("../models/HeadquarterAddress");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

const { verifyToken } = require("../middleware/verifyToken");
router
  .route("/")
  .get( getAddresses)
  .post(verifyToken , createAddress);

router
  .route("/:id")
  .get(getAddress)
  .put(verifyToken , updateAddress)
  .delete(verifyToken , deleteAddress);

module.exports = router;

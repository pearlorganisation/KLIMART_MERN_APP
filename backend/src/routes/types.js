const express = require("express");
const router = express.Router();
const {
  uploadTypes,
  deleteType,
  getSingleType,
  getType,
  getTypes,
  updateType,
} = require("../controllers/typeController");
const tag = require("../models/Type");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(getTypes).post(verifyToken , uploadTypes);
router.route("/:id").delete(verifyToken , deleteType).put(verifyToken , updateType).get(getSingleType);

module.exports = router;

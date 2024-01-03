const express = require("express");
const {
  createCurrentVacancies,
  getCurrentVacancies,
  getSingleCurrentVacancies,
  updateCurrentVacancies,
  deleteCurrentVacancies,
} = require("../controllers/currentVacanciesController");

const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyToken, createCurrentVacancies)
  .get(getCurrentVacancies);

router
  .route("/:id")
  .get(getSingleCurrentVacancies)
  .put(verifyToken, updateCurrentVacancies)
  .delete(verifyToken, deleteCurrentVacancies);

module.exports = router;

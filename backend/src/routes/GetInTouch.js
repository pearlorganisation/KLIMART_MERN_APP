const express = require("express");
const {
  CreateGetInTouch,
  GetInTouchDetails,
  GetInTouchOneDetail,
  updateGetInTouch,
  deleteGetInTouch,
} = require("../controllers/GetInTouchController");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { verifyToken } = require("../middleware/verifyToken");

router.route("/").get(GetInTouchDetails).post(CreateGetInTouch);

router
  .route("/:id")
  .get(GetInTouchOneDetail)
  .put(verifyToken , updateGetInTouch)
  .delete(verifyToken , deleteGetInTouch);

module.exports = router;

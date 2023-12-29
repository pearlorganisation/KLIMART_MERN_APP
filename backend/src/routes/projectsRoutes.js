const express = require("express");
const router = express.Router();
const {
  uploadProjects,
  getProject,
  deleteProject,
  updateProject,
  getSingleProject,
} = require("../controllers/projectController");
const { upload } = require("../utils/multerMultiple");
const { verifyToken } = require("../middleware/verifyToken");

// router.route("/").get(protect, advancedResults(Project), getProject).post(protect, upload.array("images"), uploadProjects)
// router.route("/").get(getProject).post(upload.array("images"), uploadProjects);
// router
//   .route("/:id")
//   .delete(deleteProject)
//   .patch(upload.array("images"), updateProject);

router
  .route("/")
  .get(getProject)
  .post( 
    verifyToken , 
    upload.fields([
      { name: "images" },
      { name: "picTwo"},
      { name: "picOne" },
      { name: "heroImg" },
    ]),
    uploadProjects
  );
router
  .route("/:id")
  .delete(verifyToken, deleteProject)
  .put( 
    verifyToken , 
    upload.fields([
      { name: "picTwo" },
      { name: "picOne" },
      { name: "heroImg" },
      { name: "images" },
    ]),
    updateProject
  )
  .get(getSingleProject);

module.exports = router;

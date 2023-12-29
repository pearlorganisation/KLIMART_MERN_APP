const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
    cloud_name: "dx92gbjvu",
    api_key: "275398975379348",
    api_secret: "4ZqWeHRfl82o7ots31V-Eaq72DQ",
  });
  

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Klimart-Career",
  },
});

const uploads = multer({ storage: storage });

module.exports = { uploads };

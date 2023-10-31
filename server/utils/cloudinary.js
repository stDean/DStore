const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const CloudinaryImageUpload = (fileToUpload, folder) => {
  return new Promise(resolve => {
    cloudinary.v2.uploader
      .upload(fileToUpload, { folder: `ecom/${folder}` })
      .then(result => {
        resolve({ url: result.secure_url }, { resource_type: "auto" });
      });
  });
};

module.exports = CloudinaryImageUpload;

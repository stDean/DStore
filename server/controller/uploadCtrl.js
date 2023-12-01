const {
  CloudinaryImageUpload,
  CloudinaryDeleteImage,
} = require("../utils/cloudinary");
const fs = require("fs");
const { StatusCodes } = require("http-status-codes");

const UploadCtrl = {
  uploadProductImages: async (req, res) => {
    const uploader = path => CloudinaryImageUpload(path, "product");
    const urls = [];
    const files = req.files;
    
    for (let file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);

      fs.unlinkSync(path);
    }

    const images = urls.map(file => file);
    res.status(StatusCodes.OK).json(images);
  },
  deleteProductImages: async (req, res) => {
    const { id } = req.params;
    const deleted = await CloudinaryDeleteImage(
      `ecom/product/${id}`,
      "product"
    );
    res.status(StatusCodes.OK).json({ msg: "Deleted" });
  },
};

module.exports = UploadCtrl;

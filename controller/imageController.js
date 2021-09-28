const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const fs = require("fs");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

exports.uploadImage = catchAsync(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new appError("No files were found", 400));
  }
  const selectedFile = req.files.file;
  if (
    selectedFile.mimetype != "image/png" &&
    selectedFile.mimetype != "image/jpeg"
  ) {
    removeTempFile(selectedFile.tempFilePath);
    return next(new appError("invalid image type", 400));
  }
  if (selectedFile.size > 1024 * 1024 * 5) {
    removeTempFile(selectedFile.tempFilePath);
    return next(new appError("File too large", 400));
  }
  cloudinary.v2.uploader.upload(
    selectedFile.tempFilePath,
    { folder: "Ecommerce" },
    async (err, result) => {
      if (err) return next(new appError("Cloud uplaod failed", 400));
      removeTempFile(selectedFile.tempFilePath);
      res
        .status(200)
        .json({ public_id: result.public_id, url: result.secure_url });
    }
  );
});

exports.deleteImage = catchAsync(async(req, res, next) => {
  const {public_id} = req.body;
  if (!public_id) {
    return next(new appError("No image were selected", 400));
  }
  cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
    if (err) return next(new appError("Sorry could not delete", 400));

    res.status(200).json("deleted");
  })
})

const removeTempFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      return res.send(err.message);
    }
  });
};

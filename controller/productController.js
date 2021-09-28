const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const productModel = require("../models/productModel");
const apiFeatures = require("../utils/apiFeatures");

//create new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const checkForExistingProduct = await productModel.findOne({
    product_id: req.body.product_id,
  });

  if (checkForExistingProduct) {
    return next(new appError("This product already exists", 400));
  }
  const productCreated = await productModel.create(req.body);
  res.status(200).json({
    data: productCreated,
  });
});

//get the list of all created product
exports.getProducts = catchAsync(async (req, res, next) => {
  let features = new apiFeatures(productModel, req.query)
  
    .filter()
    .sorting()
    .fields()
    .pagination();
  const allProducts = await features.query;
  res.status(200).json({
    products: allProducts,
  });
});

//upload some product images using multer
exports.updateProduct = catchAsync(async (req, res, next) => {
 const updatedProduct= await productModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status:'Updated',
    data:updatedProduct
  });
});

//deleting some products
exports.deleteProduct = catchAsync(async (req, res, next) => {
  await productModel.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json("Product Deleted");
});

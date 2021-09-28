const categoryModel = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");




exports.createNewCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const checkForExisitingCategory = await categoryModel.findOne({ name });
  if (checkForExisitingCategory) {
    return next(new appError("Category With this name already exists", 400));
  }
  const newCategory = await categoryModel.create(req.body);
  res.status(201).json({
     newCategory,
  });
});


exports.getCategory=async(req,res,next)=>{
  const category=await categoryModel.find();
  res.status(200).json({
    category
  })
}


exports.deleteCategory = catchAsync(async (req, res, next) => {
  await categoryModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Category Deleted",
  });
});


exports.updateCategory=catchAsync(async (req,res,next)=>{
  const{name}=req.body
      const updateCategory=await categoryModel.findByIdAndUpdate(req.params.id,{name});
    if(!updateCategory) return next(new appError("No category with such id",400))
    res.status(201).json({
        status:"Category updated",
        updateCategory
    })
})








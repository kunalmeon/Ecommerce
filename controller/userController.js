const userModel = require("../models/userModel");
const authcontroller = require("./authentication");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(ObjectId(req.user._id));

  if (!user) {
    return next(new appError("No user With such id", 400));
  }
  res.status(200).json({ user });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUser = await userModel.find({});
  if (!allUser) return next(new appError("No user found ", 404));

  res.status(200).json({
    data: allUser,
  });
});
exports.addCart=catchAsync(async(req,res,next)=>{
  const cartUser=await userModel.findById(req.user.id)
  
  if(!cartUser) return next(new appError('user does not exist',400))
 const updateUser= await userModel.findOneAndUpdate({_id:req.user._id},{ cart:req.body.cart})
  res.status(200).json({
    updateUser
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: "Deleted",
  });
});

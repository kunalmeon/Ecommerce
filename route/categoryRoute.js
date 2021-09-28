const router = require("express").Router();
const authController = require("../controller/authentication");
const categoryController = require("../controller/categoryController");

router
  .route("/createCategory")
  .post(
    authController.protect,
    authController.restrictedTo("admin"),
    categoryController.createNewCategory
  );

  router.get('/getCategory',categoryController.getCategory)
router
  .route("/category/:id")
  .delete(
    authController.protect,
    authController.restrictedTo("admin"),
    categoryController.deleteCategory
  )
  .patch(
    authController.protect,
    authController.restrictedTo("admin"),
    categoryController.updateCategory
  );


 
module.exports = router;

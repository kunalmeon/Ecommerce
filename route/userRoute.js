const router = require("express").Router();
const authController = require("../controller/authentication");
const userController = require("../controller/userController");

router.post("/signUp", authController.singUp);
router.post("/logIn", authController.logIn);
router.get("/logOut", authController.logOut);

router
  .route("/allUsers")
  .get(authController.protect, userController.getAllUser);
  router.route('/token').get(authController.askForToken)
  router.route("/userInfo").get(authController.protect, userController.getSingleUser);
 router.route('/addCart').patch(authController.protect,userController.addCart)
router.route('/deleteUser/:id').delete(authController.protect,authController.restrictedTo("admin"),userController.deleteUser)


module.exports = router;

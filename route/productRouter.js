const router = require("express").Router();
const imageUploader = require("../controller/imageController");
const productController = require("../controller/productController");
router
  .route("/product")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/product/:id")
  .patch(productController.updateProduct
    
  )
  .delete(productController.deleteProduct);

module.exports = router;

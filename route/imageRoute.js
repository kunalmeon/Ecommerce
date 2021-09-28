const router=require('express').Router()
const imageController=require('../controller/imageController')

router.route('/uploadImage').post(imageController.uploadImage)
router.route('/deleteImage').post(imageController.deleteImage)

module.exports=router

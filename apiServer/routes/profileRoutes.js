const profileController = require('../controller/profileController');
const router = require('express').Router();
const TokenValidation = require('../helper/TokenValidation');
const multer = require('../helper/multer');


router.get('/', TokenValidation, profileController.getMyProfile);
router.put('/', TokenValidation,multer, profileController.updateMyProfile);


module.exports = router
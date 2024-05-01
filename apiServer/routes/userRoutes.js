const userController = require('../controller/userController');
const router = require('express').Router();
const multer = require('../helper/multer');
const verifyToken = require('../helper/AuthToken');

router.post('', userController.addUser);
router.get('', verifyToken,userController.getUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.putUserById);
router.delete('/:id', verifyToken, userController.deleteUserById);
router.post('/login', userController.login);
router.post('/img', verifyToken, multer, userController.imgUpload);
router.get('/:id/verify/:token', userController.emailLink);
router.post('/googleLogin', userController.googleLogin);
router.post('/facebookLogin', userController.facebookLogin);
router.post('/instagramLogin', userController.instaLogin);




module.exports = router

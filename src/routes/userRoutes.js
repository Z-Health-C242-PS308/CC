const express = require('express');
const { registerController, loginController, onLoginController, updateProfilController, getUserbyidController } = require('../controller/userController');
const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');

const multer = require('../middleware/uploadImages');

const router = express.Router();

router.post('/register', multer.single("profile_img"), bucketUpload.uploadToBucket, registerController);
router.post('/login', multer.none(), loginController);

router.get('/auth', verifyToken, onLoginController);
// router.put('/profile/:id', verifyToken, multer.single('profile_image'), bucketUpload.uploadToBucket, updateProfilController);
// router.get('/profile/:id', getUserbyidController);


module.exports = router;
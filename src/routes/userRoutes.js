const express = require('express');
const { registerCtrl, loginCtrl, onLoginCtrl, updateProfilCtrl, getUserbyidCtrl } = require('../controller/userController');
const { verifyToken } = require('../middleware/authToken');
const bucketUpload = require('../utils/uploadToBucket');

const multer = require('../middleware/uploadImages');

const router = express.Router();

router.post('/register', multer.single("profile_img"), bucketUpload.uploadToBucket, registerCtrl);
router.post('/login', multer.none(), loginCtrl);

router.get('/auth', verifyToken, onLoginCtrl);
router.put('/profile/:id', verifyToken, multer.single('profile_img'), bucketUpload.uploadToBucket, updateProfilCtrl);
router.get('/profile/:id', getUserbyidCtrl);

module.exports = router;
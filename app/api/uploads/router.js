const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const controller = require('./controller');
const upload = require('../../middlewares/multer')
const photo = require('../../middlewares/photo')

router.post('/uploads', auth, upload.single('image'), controller.uploadImage);
router.post('/uploads/photo', photo.single('image'), controller.uploadPhoto);

module.exports = router;
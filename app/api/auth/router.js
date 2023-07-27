const express = require('express');
const router = express.Router();
const controller = require('./controller')
const multer = require('../../middlewares/multer')


router.post('/auth/signin', multer.single('image'), controller.signin);
router.post('/auth/register', controller.register);

module.exports = router;
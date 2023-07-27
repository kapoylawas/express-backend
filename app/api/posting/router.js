const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/posting', auth, controller.getAllPosting);
router.post('/posting', auth, controller.createPost);

module.exports = router;
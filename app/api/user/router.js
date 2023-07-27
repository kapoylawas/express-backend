const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/user/:id', auth, controller.user);
router.post('/user/change-password/:id', auth, controller.updatePassword);

module.exports = router;
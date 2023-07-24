const express = require('express');
const router = express.Router();
const {auth} = require('../../middlewares/auth')


router.get('/posting', auth, function (req, res) {
    res.status(200).json({message: 'Router posting'});
});

module.exports = router;
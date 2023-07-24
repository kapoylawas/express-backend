const express = require('express');
const router = express.Router();

router.get('/posting', function (req, res) {
    res.status(200).json({message: 'Router posting'});
});

module.exports = router;
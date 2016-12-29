var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

module.exports = router;

router.get('/test', function (req, res) {
    res.send('ok')
})
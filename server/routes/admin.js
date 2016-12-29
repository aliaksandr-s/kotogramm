var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.post('/upload-picture', function (req, res) {
    res.send(req.user)
})

router.get('/test/:user/:id', function (req, res) {
    res.send(req.params)
})

module.exports = router;
var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
var fs = require('fs');
var findRemoveSync = require('find-remove');
var multiparty = require('connect-multiparty');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var multipartyMiddleware = multiparty({
  uploadDir: './uploads'
});

router.post('/upload-picture', multipartyMiddleware, function (req, res) {
  var file = req.files.file;

  cloudinary.uploader.upload(file.path, function (result) {
    findRemoveSync('./uploads', {dir: "*", files: "*.*"})
    User.findOneAndUpdate(
       {username: req.body.user},
       {$push: {"images": result.url}},
       {safe: true, upsert: true, new : true},
       function(err, model) {
          if (err) console.log(err)
          res.send(result.url)
       }
    );
  });

})

router.get('/test/:user/:id', function (req, res) {
  res.send(req.params)
})

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');
var findRemoveSync = require('find-remove');
var multiparty = require('connect-multiparty');
var User = require('../models/user');

var multipartyMiddleware = multiparty({
  uploadDir: './uploads'
});

cloudinary.config({
  cloud_name: 'dpojy95nf',
  api_key: '782415393211716',
  api_secret: '288qvYM8NQ9qh0Tv9fPaxRVLQC4'
});

router.post('/save', multipartyMiddleware, function (req, res) {
  var file = req.files.file;

  cloudinary.uploader.upload(file.path, function (result) {
    findRemoveSync('./uploads', {dir: "*", files: "*.*"})
    User.findByIdAndUpdate(
       req.user,
       {$push: {"images": result.url}},
       {safe: true, upsert: true, new : true},
       function(err, model) {
          if (err) console.log(err)
          res.send(result.url)
       }
    );
  });

})

router.get('/get-all', function (req, res) {
  if(req.user) {
    User.findById(req.user, function (err, user) {
      if (err) console.log(err);
      res.send(user.images)
    });
  } else {
    res.send({})
  }
})

module.exports = router;
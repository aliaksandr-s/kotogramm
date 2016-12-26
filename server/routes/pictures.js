var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({
    // uploadDir: '../client/uploads'
    uploadDir: './uploads'
});

cloudinary.config({ 
  cloud_name: 'dpojy95nf', 
  api_key: '782415393211716', 
  api_secret: '288qvYM8NQ9qh0Tv9fPaxRVLQC4' 
});

router.post('/save', multipartyMiddleware, function (req, res) {
  //var file = req.body.data;
  var file = req.files.file;
  console.log(file.name);
  console.log(file.type);
  console.log(file)
  //fs.writeFileSync(file.name, file)
  cloudinary.uploader.upload(file.path, function(result) { 
    console.log(result) 
  });
  res.send(file.path)
})

router.get('/get-all', function (req, res) {
    res.send('sending')
})

module.exports = router;
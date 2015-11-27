var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

 exports.uploadImage = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware

    var user = req.user,
        file = req.files.file,
        targetName = file.name,
        TARGET_PATH = path.resolve(__dirname, './../../public/photos'),
        tempPath = req.files.file.path,
        targetPath = path.join(TARGET_PATH, targetName),
        is = fs.createReadStream(tempPath),
        os = fs.createWriteStream(targetPath);

    is.pipe(os);

    is.on('end', function() {

      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }
        Profile.update({ username: user.username}, { imageUrl: targetName }, function(err, nums) {
            if (err) res.json({error: err});

            return res.json({success: true, name: targetName });
        })
      });
    });
  }

  exports.newUploadImage = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware

    var user = req.user,
        file = req.files.file,
        targetName = file.name,
        TARGET_PATH = path.resolve(__dirname, './../../public/photos'),
        tempPath = req.files.file.path,
        targetPath = path.join(TARGET_PATH, targetName),
        is = fs.createReadStream(tempPath),
        os = fs.createWriteStream(targetPath);

    is.pipe(os);

    is.on('end', function() {

      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }

        Profile.findOne({ username: user.username }, function(err, profile) {
            if (err) return res.json({ message : 'error fetching profile'});

            profile.image.data = fs.readFileSync(targetPath);
            profile.image.contentType = 'image/jpg';

            profile.save(function (err, profile) {
                if (err) res.json({error: err});    

                return res.json({success: true, name: targetName });
            });
        });
      });
    });
  }

 
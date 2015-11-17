var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
//var logger = require('winston');

//handle avatar upload
exports.uploadAvatar = function (req, res) {
    console.log('inside uploadAvatar');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var file = files.file;
        var username = fields.username;
        console.log('username: ' + username);
        var tempPath = file.path;
        //var targetPath = path.resolve('./public/photos/' + username + '/' + file.name);
        var targetPath = path.resolve('./public/photos/' + file.name);
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }
            //logger.debug(file.name + " upload complete for user: " + username);
            //return res.json({path: 'photos/' + username + '/' + file.name})
            return res.json({path: 'photos/' + file.name})
        })
    });
};
/*
exports.uploadImage = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);

    var TARGET_PATH = path.resolve(__dirname, '../');

    var tempPath = req.files.file.path;
    var targetName = 'sofine.jpg';
    var targetPath = path.join(TARGET_PATH, targetName);

    var is = fs.createReadStream(tempPath);

    var os = fs.createWriteStream(targetPath);

    is.pipe(os);

    is.on('end', function() {

      //delete file from temp folder
      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }

        return res.json({path: 'photos/' + file.name})
        

      });//#end - unlink
    });//#end - on.end
  }*/

 exports.uploadImage = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    console.log('1');

    var user = req.user;
        
    console.log('2: ' + user.username);

    

    
    var file = req.files.file;
    var targetName = file.name;

     console.log('ok so far');
       var  TARGET_PATH = path.resolve(__dirname, './../../public/photos');
       console.log('ok so far');
        var tempPath = req.files.file.path,
        //targetName = file.name,
        targetPath = path.join(TARGET_PATH, targetName),
        is = fs.createReadStream(tempPath),
        os = fs.createWriteStream(targetPath);

    console.log(targetPath);

    is.pipe(os);

    is.on('end', function() {

      fs.unlink(tempPath, function(err) {
        if (err) {
          return res.send(500, 'Something went wrong');
        }

        console.log('3s ');

        Profile.update({ username: user.username}, { imageUrl: targetPath }, function(err, nums) {
            if (err) res.json({error: err});

            return res.json({success: true, path: targetPath });
        })
      });//#end - unlink
    });//#end - on.end
  }

 
const path = require('path');
const multer = require('multer');
var fs = require('fs');


// This middleware is to upload the component file.

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        
        console.log("file", file);

        callback(null, 'user_'+req.body.userId+'_components_file');
    },
    filename: (req, file, callback) => {
        
        let ext = path.extname(file.originalname);
        callback(null,Date.now()+'_'+ file.originalname);
    }
})

exports.uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        {
            if (!fs.existsSync('user_'+req.body.userId+'_components_file')){
                fs.mkdirSync('user_'+req.body.userId+'_components_file');
                callback(null, true);
            }
            else{
                callback(null, true);
            }
            
        }

    }
})


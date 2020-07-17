const path = require('path');
const multer = require('multer');

// This middleware is to upload the image.

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("file", file);

        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        
        let ext = path.extname(file.originalname);
        callback(null, Date.now() + ext);
    }
})

exports.uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/jpeg'
        ) {
            callback(null, true);
        }
        else {
            req.error = "file not supported";
            callback(null, false);
        }
    }
})


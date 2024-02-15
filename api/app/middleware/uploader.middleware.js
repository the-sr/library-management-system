const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, 'public/');
    },
    filename: (req, file, next) => {
        let filename = Date.now() + "-" + file.originalname;
        next(null, filename);
    }
})

const imageFilter = (req, file, next) => {
    let allowed = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp', 'svg'];
    let fielParts = file.originalname.split('.');
    let extension = fielParts.pop();
    if (allowed.includes(extension.toLowerCase())) {
        next(null, true);
    } else {
        next({ status: 400, msg: "Image File Format not supported." }, null);
    }
}

const uploader = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5000000
    }
});

module.exports = uploader;
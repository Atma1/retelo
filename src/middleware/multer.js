const multer = require('multer');

const fileType = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        const valid = fileType[file.mimetype];
        let invalidType = new Error('Invalid image file type');
        if (valid) invalidType = null;
        cb(invalidType, 'public/image')
    },
    filename: (_, file, cb) => {
        const ext = fileType[file.mimetype];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
})

const upload = multer({storage: storage, limits: {fileSize: 3 * 1000 * 1000}});

module.exports = upload;
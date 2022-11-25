const multer = require("multer");

// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const destPath = path.join(__dirname, "..", "imgs");
//         cb(null, destPath);
//     },
//     filename: (req, file, cb) => {

//         const [name, ext] = file.originalname.split(".");

//         const random = Date.now();

//         const filename = `${name}-${random}.${ext}`;
//         cb(null, filename);
//     }
// });


const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
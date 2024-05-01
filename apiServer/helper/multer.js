const multer = require('multer');
const path = require('path');
console.log("inside routerrrrrrrrrrrrrrrrr")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); //set all types of extension available
        cb(null, file.fieldname + '-' + Date.now() + fileExtension); // Set filename 
    }
});
 console.log(storage,"storage")
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }
}).single("file");
module.exports = upload;


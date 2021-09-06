//MULTER
const multer = require("multer");
const path = require('path')
const res = require("express/lib/response");

// MULTER FUNCTIONS
//Set storage engine + define image name
const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
});
  
//Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("picture");
  
//check file type
function checkFileType(file, cb) {

  //allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
    
  //check ext
  const extname = filetypes.test(
      path.extname(file.originalname).toLocaleLowerCase()
  );
    
  //check mime type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb("Error: images only!");
  }
}

module.exports = {
  checkFileType,
  upload,
  storage,
}
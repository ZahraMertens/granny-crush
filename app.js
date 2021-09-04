//Uploading images to the profile using Multer

const express = require("express");
const multer = require("multer");
const path = require("path");
const ejs = require("ejs");
const res = require("express/lib/response");

//Set storage engine + define image name
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        DataTransfer.now() +
        path.extname(file.originalname)
    );
  },
});

//Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

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

//Init app
const app = express();

//ejs
app.set("view engine", "ejs");

//Storage image folder
app.use(express.static("./public"));

app.get("/", (req, res) => res.render("profile"));

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("profile", {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render("profile", {
          msg: "Error: no file selected!",
        });
      } else {
        res.render("profile", {
          msg: "File uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

const port = 3000;
//passing port
app.listen(port, () => console.log(`Server started on port ${port}`));

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
//Multer
const multer = require('multer');
//Socket
// const server = require('http').createServer(app);
// const io = require('socket.io')(server)

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

///!!!!!
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    console.log("file", file)
    fileExtension = file.originalname.split(".")[1]
    cb(null, file.fieldname + "-" + Date.now() + "." + path.extname(file.originalname))
  },
})

///!!!!!
var upload = multer({ storage: storage }).single("picture");

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);


//!!!!!!
// app.post('/profile', upload.single('picture'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const fromatMsg = require("./utils/chat");
const { getUser, userJoin, userLeaves, roomUsers } = require("./utils/users");

const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const sequelize = require('./config/connection');
const formatMsg = require('./utils/chat');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

io.on('connection', (socket) => {
  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Sigle client
    socket.emit('msg', formatMsg('Admin', 'Welcome to the Chat!'));

    //When user connects all clienst except user
    socket.broadcast.to(user.room).emit('msg', formatMsg('Admin', `${user.username} has joined the room!`));

    //Send user info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: roomUsers(user.room)
    });
  })

  //Listen for chat message
  socket.on('chatMsg', msg => {

    const user = getUser(socket.id)

    console.log(msg)
    io.to(user.room).emit('msg', formatMsg(user.username, msg))
  })  
  
  //WHEN client disconnects
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);

    if(user){
      io.to(user.room).emit("msg", formatMsg('Admin', `${user.username} has left the chat!`));

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getUser(user.room)
      });
    }
 
  })
})

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// io.emit("some event", {
//   someProperty: "some value",
//   otherProperty: "other value",
// }); 

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});

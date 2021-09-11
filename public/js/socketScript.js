// var socket = io();

// var messages = document.getElementById("messages");
// var form = document.getElementById("form");
// var input = document.getElementById("input");


// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", input.value);
//     input.value = "";
//   }
// });

// socket.on("chat message", function (msg) {
//   var item = document.createElement("li");
//   item.classList.add("message-li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });


// NEW SOCKET CODE
const chatForm = document.getElementById('chat-form');
const chatMsgs = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users')
const sidebar = document.querySelector('.chat-sidebar')

//Get username and room from url
const {username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
console.log(username, room);

const socket = io();

socket.emit('joinRoom', {username, room});

//Get room and users
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room);
  outputUsers(users);

  //If more users than height initialize scroll in css
  sidebar.scrollBottom = sidebar.scrollHeight;
})

//Message from server 
socket.on('msg', message => {
  console.log(message);
  outputMsg(message);

  //Scroll down 
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
});

//message submit

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  //Get message text
  const msg = event.target.elements.msg.value;

  //Emit message to server
  socket.emit('chatMsg', msg);

  event.target.elements.msg.value = ''
  event.target.elements.msg.focus()
});

//Output message to dom
function outputMsg(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text-chat">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div)
};

//Render data / dom manipulation
function outputRoomName (room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map( user => `<li class="li-users-room">${user.username}</li>`).join('')}
  `
}


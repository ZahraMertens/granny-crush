//const moment = require('moment')

function formatMsg (username, text) {
 return {
     username,
     text,
     //time: moment().format("h:mm a") 30min
 }
}

module.exports = formatMsg
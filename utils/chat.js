const moment = require('moment-timezone');

function formatMsg (username, text) {
 return {
     username,
     text,
     time: moment().tz("Australia/Sydney").format("h:mm a") //30min in video
 }
}

module.exports = formatMsg


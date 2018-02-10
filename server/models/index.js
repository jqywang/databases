var db = require('../db');
var mysql = require('mysql');

var makeQuery = function (query) {
  return new Promise (function (resolve, reject) {
    db.query(query, function(err, result) {
      if (!err) {
        resolve(result);
        console.log(query + 'resolved');
      } else {
        reject(err);
      }
    });
  });
};


module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (msgObj) {
      
      var user = msgObj.username;
      var room = msgObj.roomname;
      console.log('this is room' + room);
      var message = msgObj.message;
      // var msgInsertQ = `INSERT INTO messages(message, userID, roomID)
      // VALUES(\'${message}\', ${rIndex}, ${uIndex})`;
      
      var roomInsertQ = `INSERT IGNORE INTO rooms (name) VALUES (\'${room}\')`;
      var userIndexQ = `SELECT ID FROM users WHERE name = \'${user}\'`;
      var roomIndexQ = `SELECT ID FROM rooms WHERE name = \'${room}\'`;
      
      makeQuery(roomInsertQ);      
      // var query = `INSERT IGNORE INTO messages(message, userID, roomID) VALUES (\'${username}\')`;
      // var makeQuery = function (string, username) {
      //   return new Promise (function (resolve, reject) {
      //     db.query(string, function(err, result) {
      //       if (!err) {
      //         resolve(result);
      //       } else {
      //         reject(err);
      //       }
      //     });
      //   });
      // };
      // makeQuery(query)
      
      
      
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
    },
    post: function (username) {
      var query = `INSERT IGNORE INTO users(name) VALUES (\'${username}\')`;
      makeQuery(query);
    }
  }
};


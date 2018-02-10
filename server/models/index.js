var db = require('../db');
var mysql = require('mysql');
var Promise = require('bluebird');

var makeQuery = function (query) {
  return new Promise (function (resolve, reject) {
    db.query(query, function(err, result) {
      if (!err) {
        console.log(query + 'resolved');
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};


module.exports = {
  messages: {
    get: function (callback) {
      var messageGetQ = 'SELECT * FROM messages';
      var roomID;
      var userID;
      var message;
      makeQuery(messageGetQ)
        .then(function (results) {
          roomID = results[0].roomID;
          userID = results[0].userID;
          message = results[0].message;
          var roomnameQ = `SELECT name FROM rooms WHERE ID = ${roomID}`;
          var usernameQ = `SELECT name FROM users WHERE ID = ${userID}`;
          return Promise.all([makeQuery(roomnameQ), makeQuery(usernameQ)]);
        })
        .then(function(array) {
          var roomname = array[0][0].name;
          var username = array[1][0].name;
          callback({'message': message, 'username': username, 'roomname': roomname});
        });
    }, // a function which produces all the messages
    post: function (msgObj, callback) {
      
      var user = msgObj.username;
      var room = msgObj.roomname;
      var message = msgObj.message;
      var roomInsertQ = `INSERT IGNORE INTO rooms (name) VALUES (\'${room}\')`;
      var userIndexQ = `SELECT ID FROM users WHERE name = \'${user}\'`;
      var roomIndexQ = `SELECT ID FROM rooms WHERE name = \'${room}\'`;
      
      var userInsertQ = `INSERT IGNORE INTO users(name) VALUES (\'${user}\')`;
      makeQuery(userInsertQ)
        .then(function() {
          return makeQuery(roomInsertQ); 
        })
        .then( function () {
          return Promise.all([makeQuery(roomIndexQ), makeQuery(userIndexQ)]);
        })
        .then(function (array) {
          var rIndex = array[0][0].ID;
          var uIndex = array[1][0].ID;
          var msgInsertQ = `INSERT INTO messages(message, userID, roomID)
          VALUES(\"${message}\", ${rIndex}, ${uIndex})`;
          return makeQuery(msgInsertQ);
        })
        .then(function () {
          return makeQuery('SELECT * FROM messages');
        })
        .then(function (result) {
          callback(result);
        })
        .catch(function(error) {
          console.log('catching');
          console.log(error);
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
    },
    post: function (username, callback) {
      var query = `INSERT IGNORE INTO users(name) VALUES (\'${username}\')`;
      makeQuery(query)
        .then(function (results) {
          console.log(results);
          callback(results);
        });
    }
  }
};


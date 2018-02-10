var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message, user, room) {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username) {
      console.log(username);
      var queryObj = {name: username};
      db.dbConnection.connect();
      //var search = 'SELECT name from USERS';
      // var queryProm = new Promise(function (resolve, reject) {
      // db.dbConnection.query(search, function(err, result) {
      //   resolve(result);
      // });
      // });
      var query = `INSERT IGNORE INTO users(name) VALUES (\'${username}\')`;
      db.dbConnection.query(query, function(err, result) {
        if (!err) {
          console.log('successful post');
        } else {
          console.log(err);
        }
      });
      
    }
  }
};


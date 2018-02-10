var models = require('../models');
var Promise = require('bluebird');
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};
module.exports = {
  messages: {
    // options: function(req, res) {
    //   console.log
    //   res.writeHead(200, headers);
    //   res.end('Success!');
    // },
    get: function (req, res) {
      // take in get request from client for messages
      models.messages.get(function (results) {
        res.send(JSON.stringify(results));
      });
      // calls model.messages.get();
      // 
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var dataStream = '';
      req.on('data', function(chunk){
        dataStream += chunk;
      });
      req.on('end', function () {
        dataStream = JSON.parse(dataStream);
        console.log(dataStream);
        models.messages.post(dataStream, function (result) {
          res.end(result.message);
        });
      });
      
      
      
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // take in get request for users
    },
    post: function (req, res) {
      models.users.post(req.body.username, function (results) {
        res.end('success');
      });
    }
  }
};
























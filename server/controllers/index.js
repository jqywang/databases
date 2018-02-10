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
    get: function (req, res) {
      // take in get request from client for messages
      
      // calls model.messages.get();
      // 
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // take in req from client
      console.log('messageposet');
      models.messages.post(req.body);
      // split up req data and send to model in 3 parts
      // calls model.messages.post();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // take in get request for users
    },
    post: function (req, res) {
      console.log('users post');
      models.users.post(req.body.username);
      res.writeHead(201, headers);
      res.end(req.body.username);
    }
  }
};
























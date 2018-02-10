var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!


var dbConnection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat'
});

dbConnection.connect();

module.exports = dbConnection;



// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".



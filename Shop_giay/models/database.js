var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Admin',
    database : 'shop'
  });
   
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Database is connected successfully!');
    }
});

module.exports = connection;
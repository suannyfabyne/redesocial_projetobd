var mysql = require('mysql');


var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'projetoBD',
      port: '3306'
    }
); 
 
 module.exports = connection;


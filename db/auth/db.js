/*
app connection to mysql database
*/
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    database: "ocy",
    user: "root",
    password: "password"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

  module.exports = con
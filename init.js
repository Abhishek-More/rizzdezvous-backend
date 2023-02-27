require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME 
})

function initUserTable(connection) {
  console.log("Creating User Table...");
  const initUserTableCommand = " \
  CREATE TABLE IF NOT EXISTS `users` ( \
    `id` int(11) NOT NULL AUTO_INCREMENT, \
    `username` varchar(50) NOT NULL, \
    `password` varchar(255) NOT NULL, \
    `email` varchar(100) NOT NULL, \
    `isManager` BOOLEAN NOT NULL, \
    `isAdmin` BOOLEAN DEFAULT 0, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8; \
  "
  
  connection.query(initUserTableCommand, (err, rows, fields) => {
    if (err) throw err
    console.log("Created User Table Successfully");
  })
}

connection.connect();

initUserTable(connection);
//Create more init functions and put them here

connection.end();
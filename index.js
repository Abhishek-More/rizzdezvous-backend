require('dotenv').config()

const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 5500

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME 
})

connection.connect()

app.get('/', (req, res) => {
  res.send('Successful Connection')
}) 

app.get('/auth/authenticate', function(request, response) {
	let email = request.body.email;
	let password = request.body.password;
	if (email && password) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results) {
      if(error) {
        throw error
      }

      if(results.length > 0) {
        //send success code
        response.status(200).send({
          username: results[0].username,
          email: results[0].email,
          isManager: results[0].isManager
        });
      } else {
        //send forbidden error code
        response.status(403).send("Not Authenticated!");
      }
		});
	} else {
    response.status(400).send('Not all fields are filled in!');
	}
});

app.post('/auth/create-user', function(request, response) {
	let email = request.body.email;
	let password = request.body.password;
	let username = request.body.username;
  let isManager = request.body.isManager;
	if (email && password && username && isManager) {
		connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], function(error, results) {
      if(error) {
        throw error
      }

      if(results.length > 0) {
        response.status(400).send("User already exists");
      } else {
        connection.query('INSERT INTO users (username, email, password, isManager) VALUES (?, ?, ?, ?)', [username, email, password, isManager], function(error, results, fields) {
          if(error) {
            throw error
          }
          response.sendStatus(200).send("User created successfully");
        });
      }
		});
	} else {
    response.sendStatus(400).send('Not all fields are filled in!');
	}
});


app.listen(process.env.PORT || 5500, () => {
  console.log(`Example app listening on port ${port}`)
})


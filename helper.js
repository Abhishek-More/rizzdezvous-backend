//Essential function that returns user data. 
//Only returns data if the email and passowrd are correct
//so this can be used for auth too!
async function getUserData(connection, email, password) {
  if(email && password) {
    const getUserDataCommand = "SELECT username, email, isManager FROM users WHERE email = ? AND password = ?"
    let userData = await new Promise((resolve, reject) => {
      connection.query(getUserDataCommand, [email, password], (err, rows, fields) => {
        if(err) {
          reject(err)
        }
        resolve(rows)
      })
    })

    //if user is does not exist, return null 
    if(userData.length == 0) {
      return null
    }

    //return user data
    return userData[0];
  }
}

module.exports = { getUserData };
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6525273',
  port: 3306,
  password: '2aIALZc7xq',
  database: 'sql6525273'
})
connection.connect();

module.exports = connection;
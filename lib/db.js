const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '130508@Momunu',
  database: 'kiosqu'
})
connection.connect();

module.exports = connection;
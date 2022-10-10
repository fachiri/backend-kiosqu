const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  user: 'fachryjk',
  port: 5432,
  password: '130508@Momunu',
  database: 'kiosqu'
})
client.connect()

module.exports = client


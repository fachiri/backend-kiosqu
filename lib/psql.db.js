const { Client } = require('pg')

// const client = new Client({
//   host: 'localhost',
//   user: 'fachryjk',
//   port: 5432,
//   password: '130508@Momunu',
//   database: 'kiosqu'
// })
const client = new Client({
  host: 'ec2-23-20-140-229.compute-1.amazonaws.com',
  user: 'rezfntivpcxbip',
  port: 5432,
  password: 'e0ce5c214a0afc3c6e681c60a935d8d71a07ef963b304eaae772ae0de392dbf3',
  database: 'dd6cg5bsl223rm'
})
client.connect()

module.exports = client


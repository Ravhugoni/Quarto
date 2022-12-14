const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quarto',
  password: 'Danny@2016',
  port: 5432,
})

module.exports = pool



const pool = require('../connection/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getCategory = (request, response) => {
    pool.query('SELECT * FROM public.category ORDER BY id ASC', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

  module.exports = {
    getCategory,
  }

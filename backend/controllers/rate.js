const pool = require('../connection/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getRatings = (request, response) => {
    pool.query('SELECT * FROM ratings r, users u WHERE r."ratedId" = u.id;', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

const getTotalRatings = (request, response) => {
    pool.query('SELECT count(*) as NumRated FROM ratings r, users u WHERE r."ratedId" = u.id;', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

  module.exports = {
    getRatings,
    getTotalRatings
  }
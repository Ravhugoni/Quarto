const pool = require('../connection/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getRatings = (request, response) => {
    pool.query('SELECT * FROM ratings r, users u WHERE r."ratedId" = u.id;', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

const getRatingsByRater = (request, response) => {
    pool.query('  SELECT count(*) as NumRated, r."raterId" as raterId FROM ratings r, users u WHERE r."ratedId" = u.id GROUP BY  r."raterId";', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }
const getRatingsByRated = (request, response) => {
    pool.query('SELECT count(*) as NumRated, r."ratedId" as ratedId FROM ratings r, users u WHERE r."ratedId" = u.id GROUP BY  r."ratedId";', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

const getTotalRatings = (request, response) => {
    pool.query('SELECT count(*) as NumRated FROM ratings r, users u WHERE r."ratedId" = u.id;', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

const postRate = (req, res) => {

    const { rate, raterId, ratedId } = req.body
    pool.query('INSERT INTO public.ratings(rate, "raterId", "ratedId") VALUES ($1, $2,$3);',  [ rate, raterId, ratedId ], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}

  module.exports = {
    getRatings,
    getTotalRatings,
    getRatingsByRater,
    getRatingsByRated,
    postRate
  }
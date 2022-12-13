const pool = require('../connection/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getJobs = (request, response) => {
    pool.query('SELECT * FROM job j, users u WHERE j."posterId" = u.id ORDER BY j.id ASC', (error, results) => {
      response.status(200).json(results.rows)
    }),handleErr
  }

//   const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
     
//       response.status(200).json(results.rows)
//     }),handleErr
//   }
  
  const postJob = (req, res) => {

    const { title, discription, address, length, status, created_at, posterId, completerId, price, area, categoryId} = req.body
    pool.query('INSERT INTO public.job(title, discription, address, length, status, created_at, "posterId", "completerId", price, area, "categoryId") VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11);',  [title, discription, address, length, status, created_at, posterId, completerId, price, area, categoryId], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}
  
//   const updateUser = (request, response) => {
//     const id = request.params.id;
//     const { firstname,lastname,email,phone} = request.body



    
  
//     pool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id=$5 returning *',[firstname, lastname, email, phone, id], (error, results) => {
        
//           response.status(200).send()
//         //response.send(JSON.stringify(results));
        
//       }
//     )
//   }

  
//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
     
//       response.status(200).send(`User deleted with ID: ${id}`)
//     }),handleErr
//   }
  
  module.exports = {
    getJobs,
    postJob,
    // postUsers,
    // updateUser,
    // deleteUser
  }


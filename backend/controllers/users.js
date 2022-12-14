const pool = require('../connection/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.users ORDER BY id ASC', (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }
  
  const postUsers = (req, res) => {

    const { firstname, lastname, email, phone, password, usertype} = req.body

    pool.query('INSERT INTO public.users (firstname,lastname, email, phone, password, usertype) VALUES ($1, $2, $3, $4, $5, $6)',  [firstname, lastname, email, phone, password, usertype], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}
  
  const updateUser = (request, response) => {
    const id = request.params.id;
    const { fullname, email, idNumber, address, userType, phone} = request.body

    pool.query('UPDATE public.users SET fullname= $1, email= $2, "idNumber"= $3, address = $4, "userType"= $5, phone=$6 WHERE id=$7 returning *',[fullname, email, idNumber, address, userType, phone, id], (error, results) => {
        
        response.status(200).send()
        //response.send(JSON.stringify(results));
      }
    )
  }

  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
     
      response.status(200).send(`User deleted with ID: ${id}`)
    }),handleErr
  }
  
  module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUser,
    deleteUser
  }


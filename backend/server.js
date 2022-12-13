const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const login = require('./controllers/login');
const register = require('./controllers/register');
const user = require('./controllers/users');
const job = require('./controllers/jobs');
const cat = require('./controllers/category');
const rate = require('./controllers/rate');
const port = 3000;
// const dotenv = require('dotenv');
const cors = require('cors');

var corsOptions = {
    origin:"http://localhost:4200"
}
app.use(cors(corsOptions));
// dotenv.config();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//routes for login
app.post('/users/login', login.login)

//routes for registering
app.post('/users/register', register.registerUser)

//routes for users
app.get('/users', user.getUsers)

//routes for Jobs
app.get('/jobs', job.getJobs)
app.post('/jobs', job.postJob)

//routes for Jobs
app.get('/category', cat.getCategory)

//routes for Jobs
app.get('/rate', rate.getRatings)
app.get('/numRate', rate.getTotalRatings)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const _ = require('lodash')
const bodyParser = require('body-parser')
const verifyToken = require('./auth/verifyToken')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
	'allowedHeaders': ['Content-Type', 'Authorization'],
  	'exposedHeaders': [],
  	'origin': '*',
  	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  	'preflightContinue': false
}))


app.get('/checking', (req, res) => {
   	res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial!!!"
   });
});


app.use('/login', require('./routes/login.routes'))
app.use('/user', verifyToken, require('./routes/user.routes'))
app.use('/blog', verifyToken, require('./routes/blog.routes'))
app.use('/promise/blog', verifyToken, require('./routes/promise.blog.routes'))

app.use('/migration', require('./routes/migration.routes'))

app.listen(PORT, () => {
   console.log(`Server is running on Port ${PORT}`);
});
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const verifyToken = require('./auth/verifyToken')

const PORT = 3000;
exports.app = app;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/checking', (req, res) => {
   	res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial"
   });
});


app.use('/login', require('./routes/login.routes'))
app.use('/user', verifyToken, require('./routes/user.routes'))
app.use('/blog', verifyToken, require('./routes/blog.routes'))

app.listen(PORT, () => {
   console.log('Server is running on Port',PORT);
});
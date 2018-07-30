require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.MONGODB_URI, {
 	useNewUrlParser: true,
  	reconnectInterval: 500, // Reconnect every 500ms
  	poolSize: 10, // Maintain up to 10 socket connections
});

connection.on('error', (err) => {
  console.log('Error connecting db:', err.message)
});

exports.app = app;
exports.connection = connection;


const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/checking', function(req, res){
   	res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial"
   });
});

app.use('/user', require('./routes/user.routes'))

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});
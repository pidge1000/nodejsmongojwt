require('dotenv').config()
const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

mongoose.Promise = global.Promise
const connection = mongoose.createConnection(process.env.MONGODB_URI, {
 	useNewUrlParser: true,
  	reconnectInterval: 500, // Reconnect every 500ms
  	poolSize: 10, // Maintain up to 10 socket connections
});

connection.on('error', (err) => {
	console.log('Error connecting db:', err.message)
})

exports.connection = connection
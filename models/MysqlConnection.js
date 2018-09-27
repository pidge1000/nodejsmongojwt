require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
	host: process.env.MysqlHOST || 'localhost',
	user: process.env.MysqlUser || 'root',
	password: process.env.MysqlPassword || 'root',
	database: 'EdTech'
});

connection.connect(function(error) {
	if(error) console.log('Error connecting db:', error.message)
})

exports.connection = connection
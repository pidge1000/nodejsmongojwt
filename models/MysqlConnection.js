require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
	host: process.env.MysqlHOST || 'localhost',
	user: process.env.MysqlUser || 'root',
	password: process.env.MysqlPassword || 'root'
});

exports.connection = connection
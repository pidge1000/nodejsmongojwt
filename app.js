require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const _ = require('lodash')
const bodyParser = require('body-parser')
const verifyToken = require('./auth/verifyToken')
const verifyMigration = require('./auth/verifyMigration')

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


// Migration Routes Here (Migrate from Mysql to MongoDB Database)
app.use('/migration/city', verifyMigration, require('./migration/city.routes'))
app.use('/migration/country', verifyMigration, require('./migration/country.routes'))
app.use('/migration/category', verifyMigration, require('./migration/category.routes'))
app.use('/migration/instituate', verifyMigration, require('./migration/instituate.routes'))
app.use('/migration/location', verifyMigration, require('./migration/locationMaster.routes'))
app.use('/migration/subCategory', verifyMigration, require('./migration/subCategory.routes'))

app.listen(PORT, () => {
   console.log(`Server is running on Port ${PORT}`);
});
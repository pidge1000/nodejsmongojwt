This is API Built on Nodejs, Express, Moongose and Es6/Promises. Deploy on Heroku and use mlab as Database as a service.

1. Test API: https://api-ecoaching-guru.herokuapp.com/checking

2. <POST> https://api-ecoaching-guru.herokuapp.com/login/signup
   <API Datapoint> { email, password, first_name, last_name, type //1 => Admin, 2 => Non-Admin }

3. <POST> http://api-ecoaching-guru.herokuapp.com/login/signin
   <API Datapoint> { email, password }
   <Response>  JWT Token

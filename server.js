var express = require('express'),
	app = express(),
	ejs = require('ejs'),
	bodyParser = require('body-parser');

	mongoose = require('mongoose'),
	User = require('./models/user');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/test');

app.get('/signup', function (req, res) {
	res.send('coming soon');
});
// user submits the signup form
app.post('/users', function (req, res) {
	// grab user data from params (req.body)
	var newUser = req.body.user;
	// creates new user with secure password
	User.createSecure(newUser.email, newUser.password, function (err, user){
		res.send(user);
	});
});

app.listen(3000, function (){
	console.log('server started on localhost:3000');
});
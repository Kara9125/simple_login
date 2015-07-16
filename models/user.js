var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema({
	email: String,
	passwordDigest: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

// create new user w secure password
UserSchema.statics.createSecure = function (email, password, callback){
	// this references the schema
	var that = this;
	// hash password user enters at sign up
	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(password, salt, function (err, hash){
			console.log(hash);

			// create the new user & save to db w hashed password
			that.create({
				email: email,
				passwordDigest: hash
			}, callback);
		}):
	});
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback){
	// find user by email entered at log in
	this.findOne({email: email}, function (err, user) {
		console.log(user);
		// send error, if cant find user
		if (user === null){
			throw new Error('Can\'t find user with email ' + email);
		// if found, check if password is correct
		} else if (user.checkPassword(password)){
			callback(null, user);
		
		}
	});
};

// compare password user enters w hashed password ('passwordDigest')
UserSchema.methods.checkPassword = function (password){
// run hasting algorithm (w salt) on passwrod user enters in order 2 compare w 'passwordDigest'
	return bcrypt.compareSync(password, this.passwordDigest);
};
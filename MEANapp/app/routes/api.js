var User = require('../models/user');

module.exports = function(router){

	//USER REGISTRATION
	router.post('/users', function(req, res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null || req.body.username == ''|| req.body.password == null || req.body.email == null || req.body.password == '' || req.body.email == ''){
			res.json({ success: false, message: 'Ensure username, email, and password were provided'}); //false if the route is null empty etc.
		} else {
			user.save(function(err){
			if(err) {
				res.json({success: false, message: 'Username or email already exists'});
			} else {
				res.json({success: true, message: 'user created!'});
			}
		});
		
		}
	});

	//USER LOGIN ROUTE
	//http://localhost:port/api/authenticate
	router.post('/authenticate', function(req,res){
		User.findOne({ username: req.body.username }).select('email username password').exec(function(err,user){
			if(err) throw err;

			if(!user){
				res.json({sucess: false, message: 'Could not authenticate user'});
			} else if (user) {
				if( req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
					res.json({success: false, message: 'No password Provided'});
                }
				if(!validPassword) {
					res.json({ success: false, message: ' Could not Authenticate password'});
				} else {
					res.json({ success: true, message: ' User Authenticated!'});
				}
			}
		});
	});


	return router;
}
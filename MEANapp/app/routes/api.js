var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'check123';
var profile = {};
//var Homework = require('../models/homework');

module.exports = function(router){

	//USER REGISTRATION
	router.post('/users', function(req, res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.teacher = req.body.teacher;
		

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
				res.json({success: false, message: 'Could not authenticate user'});
			} else if (user) {
				if( req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
					res.json({success: false, message: 'No password Provided'});
                }
				if(!validPassword) {
					res.json({ success: false, message: ' Could not Authenticate password'});
				} else {
					var token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'}); // create json token when they successfully log in with secret encryption and expires in 24 hours
					res.json({ success: true, message: ' User Authenticated!', token: token}); // respond to user with that token
				}
			}
		});
	});

	

	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
		if(token) {
			//varify token
			jwt.verify(token,secret,function(err,decoded){
				if(err) {
                    res.json({success: false, message: 'Token invalid'});

                } else {
					req.decoded = decoded; //decrpyts token - user/email
					next();
                }
			});
		}else {
			res.json({success: false, message: 'No token provided'});
		}
	});

	router.post('/me', function(req, res) {
		res.send(req.decoded);
	});

	router.get('/permission', function(req,res){
			User.findOne({username: req.decoded.username}, function(err, user){
				if(err) throw err;
				if(!user){
					res.json({success: false, message: 'No user was found'});
				} else {
					res.json({success: true, permission: user.permission})
				}
			})
	});

	return router;
}

//module.exports = function(hwRouter){

//	hwRouter.post('/homeworks', function(req, res){
//		var homework = new Homework();
//		homework.summary = req.body.summary;
//		homework.description = req.body.description;
//		homework.startDate = req.body.startDate;
//		homework.endDate = req.body.endDate;
//		if(req.body.summary == null || req.body.summary == '' || req.body.description == null || req.body.description == '' || req.body.startDate == null || req.body.startDate == '' || req.body.endDate == null || req.body.endDate == ''){
//			res.send("Ensure all fields were provided!");
//		}
//		else{
//			homework.save(function(err){
//				if(err){
//					res.send('Homework already exists!');
//				}
//				else{
//					res.send('Homework created successfully!');
//				}
//			});
//		}
//	});
//
//	return hwRouter;
//}
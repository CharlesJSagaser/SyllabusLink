var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
//var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);


app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://heroku_rlcgft36:6o6uhu9ja73111nn7o0i0scoir@ds129031.mlab.com:29031/heroku_rlcgft36
',function(err){
	if(err) {
		console.log('Not connected to the database:' + err);
	} else {
		console.log('Successfully connected to MongoDB')
	}
})

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})

app.listen(port,function(){
	console.log('Running the server port:' + port);
});


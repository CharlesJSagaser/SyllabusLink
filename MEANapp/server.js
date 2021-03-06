var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
//var Homework = require('./app/models/homework');
//var User = require('./app/models/user');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var hwRouter = express.Router();
var hwRoutes = require('./app/routes/hwApi')(hwRouter);
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);
var mongojs = require('mongojs')
var db = mongojs('test',['homeworks']);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);
app.use('/hwApi', hwRoutes);

mongoose.connect('mongodb://localhost:27017/test',function(err){
	if(err) {
		console.log('Not connected to the database:' + err);
	} else {
		console.log('Successfully connected to MongoDB')
	}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));

});



app.listen(port,function(){
	console.log('Running the server port:' + port);
});

app.get('/test', function(req,res){
	db.test.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});


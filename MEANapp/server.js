var express = require('express');
var app = express();
var port = process.env.PORT || 8000
var morgan = require('morgan');
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test',function(err){
	if(err) {
		console.log('Not connected to the database:' + err);
	} else {
		console.log('Successfully connected to MongoDB')
	}
})

app.use(morgan('dev'));

app.get('/home', function(req,res){
	res.send('Hello from home');
})


app.listen(port,function(){
	console.log('Running the server  port:' + port);
});


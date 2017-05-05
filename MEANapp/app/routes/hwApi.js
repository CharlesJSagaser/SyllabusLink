var Homework = require('../models/homework');
var User = require('../models/user');
var mongoose = require('mongoose');
var google = require('googleapis');
var jwt = require('jsonwebtoken');
var secret = 'check123';
var googleAuth = require('google-auth-library');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var token = require('../passport/passport')
console.log('token:' +  token)
var googleAuth = require('google-auth-library');



var HW = Homework.find({}, function(err, hwData){
		
});

// function authorize(credentials, callbac 	k) {
//   var clientSecret = credentials.installed.client_secret;
//   var clientId = credentials.installed.client_id;
//   var redirectUrl = credentials.installed.redirect_uris[0];
  
//   var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, function(err, token) {
//     if (err) {
//       getNewToken(oauth2Client, callback);
//     } else {
//       oauth2Client.credentials = JSON.parse(token);
//       callback(oauth2Client);
//     }
//   });
// }
//mongoose.connect('mongodb://localhost:27017/test');
var fs = require('fs');
var readline = require('readline');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content));
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = '4etHKG0Hhj84bKCBPr2YmaC-';
  var clientId = '655984940226-dqfpncns14b1uih73i7fpmot9hd16m2l.apps.googleusercontent.com';
  var redirectUrl = "http://localhost:8000/auth/google/callback";
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      //callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      //callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}



module.exports = function(hwRouter,passport){

	hwRouter.post('/homeworks', function(req, res){
		var homework = new Homework();
		homework.summary = req.body.summary;
		homework.description = req.body.description;
		homework.startDate = req.body.startDate;
		homework.endDate = req.body.endDate;
		if(req.body.summary == null || req.body.summary == '' || req.body.description == null || req.body.description == '' || req.body.startDate == null || req.body.startDate == '' || req.body.endDate == null || req.body.endDate == ''){
			res.send("Ensure all fields were provided!");
		}
		else{
			homework.save(function(err){
				if(err) {
					res.send('Homework already exists!');
				}
				else{
					res.send('Homework created successfully!');
				}
			});
		}
	})


	var calendar = google.calendar('v3');

	hwRouter.get('/retrieveHW', function(req,res){
		Homework.find({},function(err,hwData){
			if(err) throw err;
			//console.log(hwData);
			res.json({success: true, hwData: hwData})
		});	
	
	})

	return hwRouter;
}

// 	Homework.findOne({summary: 's'}).select("summary").exec(function(err, homework){
	// 		if(err){
	// 			res.json({success: false, message: 'ERORORRORO'});
	// 		} else {
	// 			if(!homework){
	// 				res.json({success: false, message: 'No assignments in database'});
	// 			} else {

	// 				res.json(homework.summary);
	// 			}
	// 		}
	// 	});
	// });
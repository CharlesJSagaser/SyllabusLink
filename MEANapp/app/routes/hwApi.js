var Homework = require('../models/homework');
var mongoose = require('mongoose');
var google = require('googleapis');
var jwt = require('jsonwebtoken');
var secret = 'check123';
var googleAuth = require('google-auth-library');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//mongoose.connect('mongodb://localhost:27017/test');



module.exports = function(hwRouter,passport, app){

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
				if(err){
					res.send('Homework already exists!');
				}
				else{
					res.send('Homework created successfully!');
				}
			});
		}
	})


	var calendar = google.calendar('v3');
	hwRouter.get('/retrieveHW/:summary', function(req,res, Auth){
		Homework.find({},function(err,hwData){
		// 	console.log(hwData);
		// 	var event = {
		// 	  'summary': 'Google I/O 2015',
		// 	  'location': '800 Howard St., San Francisco, CA 94103',
		// 	  'description': 'A chance to hear more about Google\'s developer products.',
		// 	  'start': {
		// 	    'dateTime': '2015-05-28T09:00:00-07:00', 
		// 	    'timeZone': 'America/Los_Angeles',
		// 	  },
		// 	  'end': {
		// 	    'dateTime': '2015-05-28T17:00:00-07:00',
		// 	    'timeZone': 'America/Los_Angeles',
		// 	  },
		// 	  'recurrence': [
		// 	    'RRULE:FREQ=DAILY;COUNT=2'
		// 	  ],
		// 	  'attendees': [
		// 	    {'email': 'lpage@example.com'},
		// 	    {'email': 'sbrin@example.com'},
		// 	  ],
		// 	  'reminders': {
		// 	    'useDefault': false,
		// 	    'overrides': [
		// 	      {'method': 'email', 'minutes': 24 * 60},
		// 	      {'method': 'popup', 'minutes': 10},
		// 	    ],
		// 	  },
		// 	};

		// calendar.events.insert({
		//   auth: Auth,
		//   calendarId: 'primary',
		//   resource: event,
		// }, function(err, event) {
		//   if (err) {
		//     console.log('There was an error contacting the Calendar service: ' + err);
		//     return;
		//   }
		//   console.log('Event created: %s', event.htmlLink);
		// });

			res.json({success: true, message: "successfull retrieved the homework!"});
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
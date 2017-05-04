var Homework = require('../models/homework');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/test');


module.exports = function(hwRouter){

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

	//var Test = mongoose.model('test', homeworks, )
	hwRouter.get('/retrieveHW/:summary', function(req,res){
		Homework.findOne({summary:'s'},function(err,docs){
			console.log(docs.summary);
			res.json(docs.summary);
		});
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
	})

	return hwRouter;
}
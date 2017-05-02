var Homework = require('../models/homework');

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
	});

	return hwRouter;
}
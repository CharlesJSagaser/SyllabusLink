var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeworkEntrySchema = new Schema({

	summary: {type: String, required: true, unique: true},
	description: {type: String, required: true},
	startDate: {type: String, required: true},
	endDate: {type: String, required: true}
});

module.exports = mongoose.model('Homework', homeworkEntrySchema);
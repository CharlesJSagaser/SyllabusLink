//creates a template for a School

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var SchoolSchema = new Schema({
	name: { type: String, lowercase: true, required: true},
	college: {type: Boolean, required: true},
	highschool: {type: Boolean, required: true},
	subsription: { type: Schema.ObjectId, ref:'Subscription'},
	adminlist: [{ type: Schema.ObjectId, ref:'Admin'}],
	teacherlist: [{ type: Schema.ObjectId, ref:'Teacher'}],
   	studentlist: [{ type: Schema.ObjectId, ref:'Student'}]

})



module.exports = mongoose.model('School', SchoolSchema);


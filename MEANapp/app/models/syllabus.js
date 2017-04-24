//creates a template for a syllabus

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var SyllabusSchema = new Schema({
  coursename: { type: String, required: true},
  startdate: {type:Date, required: true},
  enddate: {type:Date, required: true},
  //lecturedays:
  proffessor:{type:String, required: true},
  //profohlocal:
  //profohtimes:


});




module.exports = mongoose.model('Syllabus', SyllabusSchema);





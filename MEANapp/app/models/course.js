//creates a template for a course

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var CourseSchema = new Schema({
  school: {type:Schema.ObjectId, ref:'School'},
  teacher: { type: Schema.ObjectId, ref:'Teacher', required: true},
  studentlist: [{ type: Schema.ObjectId, ref:'Student'}],
  syllabus:[{ type: Schema.ObjectId, ref:'Syllabus'}],
  //lecturelocal
  //lecturedays
  //lecturestarttime
  //lectureendtime
})



module.exports = mongoose.model('Course', CourseSchema);



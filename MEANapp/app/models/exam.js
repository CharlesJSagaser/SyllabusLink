//creates a template for an exam

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var SyllabusSchema = new Schema({
  examname: { type: String, required: true},
  date: {type:Date, required: true},
  //time:
  //examlocal


});




module.exports = mongoose.model('Exam', ExamSchema);
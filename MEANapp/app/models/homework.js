//creates a template for a homework

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var SyllabusSchema = new Schema({
  hwname: { type: String, required: true},
  material: { type: String},
  assigned: {type:Date, required: true},
  due: {type:Date, required: true},


});




module.exports = mongoose.model('Homework', HomeworkSchema);
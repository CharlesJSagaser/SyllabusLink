//creates a template for a ta

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var SyllabusSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String},
  //taohlocal:
  //taohtime:
  //taohdays


});




module.exports = mongoose.model('TA', TASchema);
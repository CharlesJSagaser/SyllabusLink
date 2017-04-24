//creates a template for a text block

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var TextSchema = new Schema({
  title: { type: String, required: true},
  textblock: {type: String}


});




module.exports = mongoose.model('Text', TextSchema);
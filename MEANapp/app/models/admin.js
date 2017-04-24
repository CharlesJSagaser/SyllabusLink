//creates a template for an administrator
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var AdminSchema = new Schema({
  school: {type:Schema.Types.ObjectId, ref:'School'},
  courselist: [{ type: Schema.ObjectId, ref:'Course'}],
  teacherlist: [{ type: Schema.ObjectId, ref:'Teacher'}],
  studentlist: [{ type: Schema.ObjectId, ref:'Student'}],
})

module.exports = mongoose.model('Admin', AdminSchema);





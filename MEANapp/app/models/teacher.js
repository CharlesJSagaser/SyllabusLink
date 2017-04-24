//creates a template for a teacher

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var TeacherSchema = new Schema({
  school: {type:Schema.Types.ObjectId, ref:'School'},
  courselist: [{ type: Schema.ObjectId, ref:'Course'}],
  studentlist: [{ type: Schema.ObjectId, ref:'Student'}],

})



module.exports = mongoose.model('Teacher', TeacherSchema);





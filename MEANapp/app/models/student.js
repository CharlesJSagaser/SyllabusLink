//creates a template for a student
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var StudentSchema = new Schema({
  school: {type:Schema.Types.ObjectId, ref:'School'},
  courselist: [{ type: Schema.ObjectId, ref:'Course'}],
})



module.exports = mongoose.model('Student', StudentSchema);





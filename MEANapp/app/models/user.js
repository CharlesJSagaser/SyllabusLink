//creates a template for a user for it to be stored in the mongo database

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true},
  password: { type: String, required: true},
  email: { type: String, required: true, lowercase: true, unique: true},
  _admin:{type:Schema.Types.ObjectId, ref:'Admin'},
  _teacher:{type:Schema.Types.ObjectId, ref:'Teacher'},
  _student:{type:Schema.Types.ObjectId, ref:'Student'},

});


UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null,null, function(err, hash){
  	if (err) return next (err);
  	user.password = hash;
  	next();
  });

});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', UserSchema);





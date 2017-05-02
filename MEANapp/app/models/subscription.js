//creates a template for a Subscription
var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var SubscriptionSchema = new Schema({
	start: {type: Date, required: true},
	end: {type: Date, required: true}
	semestercost: {type: Number, required:true}

});



module.exports = mongoose.model('Subscription', SubscriptionSchema);
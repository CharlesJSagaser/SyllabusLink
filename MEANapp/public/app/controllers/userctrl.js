angular.module('userControllers', [])

.controller('regCtrl', function(){

		this.regUser = function(regData) {
		console.log('Form Submitted');
		console.log(this.regData);
	};
});
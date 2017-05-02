angular.module('homeworkControllers', [])

.controller('addHwCtrl', function($http){
	this.addHw = function(hwData){
		console.log('fucking form submitted');
		console.log(this.hwData);
		$http.post('/hwApi/homeworks', this.hwData);
	};
});
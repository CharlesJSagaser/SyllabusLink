angular.module('homeworkControllers', ['homeworkServices'])

.controller('addHwCtrl', function($http){
	this.addHw = function(hwData){
		console.log('fucking form submitted');
		console.log(this.hwData);
		$http.post('/hwApi/homeworks', this.hwData);
	};
})

.controller('homeworkCtrl', function(Homework){
	//app = this;

	this.getHW = function(hwData) {
		console.log(hwData);
		Homework.getHW(hwData).then(function(data){
			console.log(data);
		});
	};
	
});
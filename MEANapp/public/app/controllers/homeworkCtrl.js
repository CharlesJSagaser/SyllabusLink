angular.module('homeworkControllers', ['homeworkServices'])

.controller('addHwCtrl', function($http){
	this.addHw = function(hwData){
		console.log('fucking form submitted');
		console.log(this.hwData);
		$http.post('/hwApi/homeworks', this.hwData);
	};
})

// .controller('homeworkCtrl', function(Homework){
// 	app = this;
// 	app.getHW = function(hwData) {
// 		console.log(hwData);
// 		Homework.getHW(hwData)
// 		)

.controller('HWCtrl', function(Homework){
	var app = this;

	//app.loading = true;

	Homework.getHW().then(function(data){
		console.log(data);
		if(data.data.success){

			app.homeworks = data.data.hwData;


		}
		
	})
	

})
			//console.log(data);
		
	

.controller('/testList', function(){
		var homework1 = {
		summary: 's',
		description: 's',
		startDate:"1111-11-11T-11:11:11-06:00",
		endDate:"1111-11-11T-11:11:11-06:00"
		}
	});
	

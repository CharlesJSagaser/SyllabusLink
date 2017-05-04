angular.module('homeworkServices', [])

.factory('Homework', function($http){
	homeworkFactory = {};


	


	//Homework.getHW(hwData)
	homeworkFactory.getHW = function(hwData){
		//console.log(hwData)
		$http.get('/hwApi/retrieveHW/', hwData)


	};

	console.log(homeworkFactory);
	return homeworkFactory
});


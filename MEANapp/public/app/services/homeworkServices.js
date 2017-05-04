angular.module('homeworkServices', [])

.factory('Homework', function($http){
	homeworkFactory = {};


	


	//Homework.getHW(hwData)
	homeworkFactory.getHW = function(hwData){
		
		$http.get('/hwApi/retrieveHW/' + hwData)


	};


	return homeworkFactory
});


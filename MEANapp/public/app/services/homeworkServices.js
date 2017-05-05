angular.module('homeworkServices', [])

.factory('Homework', function($http){
	homeworkFactory = {};


	


	//Homework.getHW(hwData)
	homeworkFactory.getHW = function(){
		
		$http.get('/hwApi/retrieveHW/')
	};

	return homeworkFactory
});

